import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle } from "lucide-react";

const apiFormSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
});

type ApiFormValues = z.infer<typeof apiFormSchema>;

interface APISettingsProps {
  onSave?: (apiKey: string) => Promise<boolean>;
  initialApiKey?: string;
}

const APISettings = ({
  onSave = async () => true,
  initialApiKey = "",
}: APISettingsProps) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<ApiFormValues>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      apiKey: initialApiKey,
    },
  });

  const handleSubmit = async (values: ApiFormValues) => {
    setIsValidating(true);
    setValidationResult(null);

    try {
      const success = await onSave(values.apiKey);

      setValidationResult({
        success,
        message: success
          ? "API key validated successfully"
          : "Invalid API key. Please check and try again.",
      });
    } catch (error) {
      setValidationResult({
        success: false,
        message: "Error validating API key. Please try again.",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">API Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Enter your OpenAI API key to enable AI functionality.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OpenAI API Key</FormLabel>
                <FormControl>
                  <Input placeholder="sk-..." type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Your API key will be stored securely and used for AI
                  interactions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {validationResult && (
            <div
              className={`flex items-center p-3 rounded-md ${validationResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            >
              {validationResult.success ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <span className="text-sm">{validationResult.message}</span>
            </div>
          )}

          <Button type="submit" disabled={isValidating} className="w-full">
            {isValidating ? "Validating..." : "Save API Key"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default APISettings;
