// import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { supabase } from "@/integrations/supabase/client";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { Card } from "@/components/ui/card";

// const Auth = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === "SIGNED_IN") {
//         navigate("/app");
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md p-8 shadow-lg">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
//           <p className="text-gray-500 mt-2">Sign in to access your recipes</p>
//         </div>
//         <SupabaseAuth
//           supabaseClient={supabase}
//           appearance={{
//             theme: ThemeSupa,
//             extend: true,
//             className: {
//               container: 'flex flex-col gap-4',
//               button: 'w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors',
//               label: 'text-sm font-medium text-gray-700',
//               input: 'w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors',
//               message: 'text-sm text-red-600 mt-1',
//               anchor: 'text-sm text-primary hover:underline'
//             }
//           }}
//           providers={[]}
//           localization={{
//             variables: {
//               sign_in: {
//                 email_label: "Email address",
//                 password_label: "Password",
//                 button_label: "Sign in",
//                 loading_button_label: "Signing in...",
//                 link_text: "Already have an account? Sign in",
//               },
//               sign_up: {
//                 email_label: "Email address",
//                 password_label: "Password",
//                 button_label: "Sign up",
//                 loading_button_label: "Signing up...",
//                 link_text: "Don't have an account? Sign up",
//                 confirmation_text: "Check your email for the confirmation link"
//               }
//             }
//           }}
//           theme="light"
//         />
//       </Card>
//     </div>
//   );
// };

// export default Auth;
// import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { supabase } from "@/integrations/supabase/client";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { Card } from "@/components/ui/card";

// const Auth = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === "SIGNED_IN") {
//         navigate("/app");
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md p-8 shadow-lg">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
//           <p className="text-gray-500 mt-2">Sign in to access your recipes</p>
//         </div>
//         <SupabaseAuth
//           supabaseClient={supabase}
//           appearance={{
//             theme: ThemeSupa,
//             extend: true,
//             className: {
//               container: "flex flex-col gap-4",
//               button: "w-full px-4 py-2 rounded-md bg-black text-white",
//               label: "text-sm font-medium text-gray-700",
//               message: "text-sm text-red-600 mt-1",
//               anchor: "text-sm text-primary hover:underline",
//             },
//           }}
//           providers={["google"]}
//           view="sign_in"
//           theme="light"
//           onlyThirdPartyProviders
//           redirectTo={window.location.origin + "/app"}
//         />
//       </Card>
//     </div>
//   );
// };

// export default Auth;

// import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { supabase } from "@/integrations/supabase/client";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { Card } from "@/components/ui/card";

// const Auth = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       if (event === "SIGNED_IN") {
//         navigate("/app");
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-6">
//       <Card className="w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden">
//         <div className="p-8">
//           <div className="text-center mb-6">
//             <h1 className="text-4xl font-extrabold text-gray-900">
//               Welcome Back
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Sign in to explore your personalized recipes
//             </p>
//           </div>
//           <SupabaseAuth
//             supabaseClient={supabase}
//             appearance={{
//               theme: ThemeSupa,
//               extend: true,
//               className: {
//                 container: "flex flex-col gap-4",
//                 button:
//                   "w-full px-4 py-3 text-sm font-medium rounded-md transition-transform transform bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105",
//                 label: "text-sm font-medium text-gray-700",
//                 message: "text-sm text-red-500 mt-1",
//                 anchor: "text-sm text-indigo-600 hover:underline",
//               },
//             }}
//             providers={["google"]}
//             view="sign_in"
//             theme="light"
//             onlyThirdPartyProviders
//             redirectTo={window.location.origin + "/app"}
//           />
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Auth;

import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/app");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/app`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 max-w-6xl mx-auto w-full">
          <Link to="/">
            <h2 className="flex items-center justify-center gap-2">
              <h2 className="text-2xl rounded-lg bg-slate-200 p-1">🍜</h2>
              <span className="font-bold text-gray-900 text-xl">
                RecipeLens AI
              </span>
            </h2>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 mt-16 relative">
        <Card className="w-full max-w-5xl bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border overflow-hidden relative z-10">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
              <img
                src="/cooking.jpg"
                alt="Cooking illustration"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Auth content */}
            <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center">
              <div className="w-full">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Sign in to explore your personalized recipes
                  </p>
                </div>

                <div className="space-y-6">
                  <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full h-12 text-base font-medium rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                  >
                    <FcGoogle className="text-2xl" />
                    Sign in with Google
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Click 👆 to cook 🍳
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
