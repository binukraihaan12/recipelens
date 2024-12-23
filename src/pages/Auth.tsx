import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-serif text-center mb-8">Welcome to Recipe Generator</h1>
        <SupabaseAuth 
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            extend: true,
            className: {
              container: 'flex flex-col gap-4',
              button: 'px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90',
              label: 'text-sm text-gray-600',
              input: 'rounded-md border p-2 w-full',
              message: 'text-sm text-red-600 mt-1'
            }
          }}
          localization={{
            variables: {
              sign_up: {
                password_input_placeholder: "Password (min. 6 characters)",
                email_input_placeholder: "Your email address",
                button_label: "Sign up",
                loading_button_label: "Signing up...",
                social_provider_text: "Sign in with {{provider}}",
                link_text: "Don't have an account? Sign up",
                confirmation_text: "Check your email for the confirmation link"
              }
            }
          }}
          theme="light"
        />
      </Card>
    </div>
  );
};

export default Auth;