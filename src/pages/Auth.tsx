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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to access your recipes</p>
        </div>
        <SupabaseAuth 
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            extend: true,
            className: {
              container: 'flex flex-col gap-4',
              button: 'w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors',
              label: 'text-sm font-medium text-gray-700',
              input: 'w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors',
              message: 'text-sm text-red-600 mt-1',
              anchor: 'text-sm text-primary hover:underline'
            }
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email address",
                password_label: "Password",
                button_label: "Sign in",
                loading_button_label: "Signing in...",
                link_text: "Already have an account? Sign in",
              },
              sign_up: {
                email_label: "Email address",
                password_label: "Password",
                button_label: "Sign up",
                loading_button_label: "Signing up...",
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