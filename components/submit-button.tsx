"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText,
  formAction,
  ...props
}: {
  children: React.ReactNode;
  pendingText: string;
  formAction?: (formData: FormData) => Promise<void>;
  [key: string]: any;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      formAction={formAction}
      disabled={pending}
      className="bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]"
      {...props}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
