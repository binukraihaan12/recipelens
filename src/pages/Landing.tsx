import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            AI Recipe Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ingredients into delicious recipes with the power of AI.
            Simply upload a photo and get instant recipe suggestions.
          </p>
          <div className="flex justify-center">
            <Link to="/app">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;