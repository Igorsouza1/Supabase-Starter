-- Extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  full_name TEXT,
  avatar_url TEXT
);

-- Create images table
CREATE TABLE IF NOT EXISTS public.images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES auth.users NOT NULL,
  external_url TEXT NOT NULL,
  filename TEXT NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  has_animal BOOLEAN,
  animal_confidence REAL,
  favorite BOOLEAN DEFAULT FALSE,
  metadata JSONB
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE
);

-- Tabela jobs
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'done', 'error')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE,
  image_count INTEGER NOT NULL DEFAULT 0
);

-- Tabela uploads
CREATE TABLE IF NOT EXISTS public.uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES public.jobs NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  file_path TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  capture_date TIMESTAMP WITH TIME ZONE,
  has_animal BOOLEAN,
  confidence FLOAT,
  favorited BOOLEAN DEFAULT FALSE
);

-- Tabela results
CREATE TABLE IF NOT EXISTS public.results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  upload_id UUID REFERENCES public.uploads NOT NULL,
  label TEXT,
  confidence FLOAT,
  box JSONB
);

-- Tabela user_limits
CREATE TABLE IF NOT EXISTS public.user_limits (
  user_id UUID REFERENCES auth.users PRIMARY KEY,
  max_images INTEGER NOT NULL DEFAULT 5000,
  current_images INTEGER NOT NULL DEFAULT 0,
  last_reset DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Set up Row Level Security (RLS)
-- Profiles: Users can only view and update their own profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Images: Users can only view and update their own images
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own images" 
  ON public.images FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own images" 
  ON public.images FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own images" 
  ON public.images FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images" 
  ON public.images FOR DELETE 
  USING (auth.uid() = user_id);

-- Subscriptions: Users can only view their own subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

-- Jobs: Usuários só podem ver e modificar seus próprios jobs
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios jobs" 
  ON public.jobs FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios jobs" 
  ON public.jobs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios jobs" 
  ON public.jobs FOR UPDATE 
  USING (auth.uid() = user_id);

-- Uploads: Usuários só podem ver e modificar seus próprios uploads
ALTER TABLE public.uploads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios uploads" 
  ON public.uploads FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios uploads" 
  ON public.uploads FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios uploads" 
  ON public.uploads FOR UPDATE 
  USING (auth.uid() = user_id);

-- Results: Usuários só podem ver resultados de seus próprios uploads
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver resultados de seus próprios uploads" 
  ON public.results FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.uploads
      WHERE uploads.id = results.upload_id
      AND uploads.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem inserir resultados para seus próprios uploads" 
  ON public.results FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.uploads
      WHERE uploads.id = results.upload_id
      AND uploads.user_id = auth.uid()
    )
  );

-- User Limits: Usuários só podem ver seus próprios limites
ALTER TABLE public.user_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios limites" 
  ON public.user_limits FOR SELECT 
  USING (auth.uid() = user_id);

-- Função para criar perfil e limites de usuário automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Criar perfil para o novo usuário
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  
  -- Configurar limites padrão para o novo usuário (plano básico)
  INSERT INTO public.user_limits (user_id, max_images, current_images, last_reset)
  VALUES (new.id, 5000, 0, CURRENT_DATE);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar a função quando um novo usuário é criado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Índices para melhorar a performance
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON public.jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_uploads_user_id ON public.uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_uploads_job_id ON public.uploads(job_id);
CREATE INDEX IF NOT EXISTS idx_results_upload_id ON public.results(upload_id);

