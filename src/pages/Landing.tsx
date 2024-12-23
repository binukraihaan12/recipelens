import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChefHat, Camera, BookOpen, ArrowRight } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            AI Recipe Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your ingredients into delicious recipes with the power of AI.
            Simply upload a photo and get instant recipe suggestions.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/app">
              <Button variant="outline" size="lg">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Upload Photo</h3>
              <p className="text-gray-600">
                Take a photo of your ingredients and upload it to our platform
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <ChefHat className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your ingredients and suggests perfect recipes
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Get Recipes</h3>
              <p className="text-gray-600">
                Receive detailed recipes with ingredients and instructions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Showcase */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Recipe Generation Process"
            className="rounded-lg shadow-xl"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Smart Recipe Generation
            </h2>
            <p className="text-gray-600">
              Our advanced AI technology analyzes your ingredients and creates
              personalized recipes tailored to what you have available. Save your
              favorite recipes and access them anytime.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Instant recipe suggestions
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Detailed cooking instructions
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Save and organize your recipes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;