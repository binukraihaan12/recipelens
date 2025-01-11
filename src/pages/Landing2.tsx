import FAQs from "@/components/Faq";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Camera,
  Menu,
  MoveRight,
  ScanSearch,
  Soup,
  X,
} from "lucide-react";
import { ChefHat } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing2 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [emoji, setEmoji] = useState("🍳"); // Initial emoji

  // List of emojis to cycle through
  const emojis = [
    "🥐",
    "🥯",
    "🍞",
    "🥖",
    "🥨",
    "🍳",
    "🥞",
    "🧇",
    "🍕",
    "🍟",
    "🍔",
    "🌭",
    "🥪",
    "🥙",
    "🧆",
    "🌮",
    "🌯",
    "🥗",
    "🥘",
    "🫕",
    "🍝",
    "🍜",
    "🍲",
    "🍛",
    "🍣",
    "🍱",
    "🥟",
    "🍤",
    "🥮",
    "🍧",
    "🍡",
    "🍨",
    "🥧",
    "🍦",
    "🍿",
    "🎂",
    "🍰",
    "🧁",
    "🍩",
    "🍪",
    "🍮",
    "🥣",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setEmoji((prevEmoji) => {
        const currentIndex = emojis.indexOf(prevEmoji);
        const nextIndex = (currentIndex + 1) % emojis.length; // Loop back to the first emoji
        return emojis[nextIndex];
      });
    }, 1750); // Change emoji every half a second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [emojis]);

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Header */}

      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 max-w-6xl mx-auto w-full relative">
        <Link to="/">
          <h2 className="flex items-center justify-center gap-2">
            <h2 className="text-2xl rounded-lg bg-slate-200 p-1">🍜</h2>
            <span className="font-bold text-black text-xl">RecipeLens AI</span>
          </h2>
        </Link>

        <button
          className="ml-auto md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-black" />
          ) : (
            <Menu className="h-6 w-6 text-black" />
          )}
        </button>

        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <a
            className="text-base font-medium text-black hover:text-black transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-200"
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#how-it-works")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            How It Works
          </a>
          <a
            className="text-base font-medium text-black transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-200"
            href="#testimonials"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#faq")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            FAQs
          </a>
        </nav>

        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 md:hidden z-50">
            <nav className="flex flex-col p-4">
              <a
                className="text-base font-medium text-black py-2 transition-all duration-200  hover:translate-x-1 relative hover:pl-2"
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#how-it-works")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setIsMobileMenuOpen(false);
                }}
              >
                How It Works
              </a>
              <a
                className="text-base font-medium text-black py-2 transition-all duration-200 hover:translate-x-1 relative hover:pl-2"
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#faq")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setIsMobileMenuOpen(false);
                }}
              >
                FAQs
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center py-20 px-8">
        {/* Emoji at the Top */}
        <div className="text-8xl mb-6">{emoji}</div>

        <h1 className="text-4xl font-bold mb-6 font-lora md:text-5xl text-black">
          Create perfect recipes in seconds with AI.
        </h1>
        <p className="text-md md:text-lg text-gray-600">
          ransform your ingredients into delicious recipes with our powerful AI
          cooking assistant.
        </p>
        <div className="my-5 flex gap-3">
          <Link to="/app">
            <Button
              className="animate-bounce text-lg bg-green-700 rounded-full hover:bg-white hover:text-green-700 border-2 hover:border-green-700 p-6 px-8 text-white focus:animate-none hover:animate-bounce hover:inline-flex tracking-wide"
              // className="bg-black text-white hover:bg-gray-800 rounded-lg"
              size="lg"
            >
              Start Cooking
              <Soup />
            </Button>
          </Link>
          {/* <Link to="#">
            <Button size="lg" variant="ghost">
              Watch a demo <ArrowRight />
            </Button>
          </Link>{" "} */}
        </div>

        {/* Testimonial Section */}
        <blockquote className="text-center italic max-w-xl">
          <p className="text-gray-600 mb-4">
            "An amazing app with the use of AI for anyone to create and maintain
            easy cooking at home."
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-blue-300 rounded-full">
              <img src="https://avatar.iran.liara.run/public/85" />
            </div>
            <div className="w-10 h-10 bg-green-300 rounded-full">
              <img src="https://avatar.iran.liara.run/public/1" />
            </div>
            <div className="w-10 h-10 bg-red-300 rounded-full">
              <img src="https://avatar.iran.liara.run/public/12" />
            </div>
            <span className="text-yellow-500 font-bold">★★★★★</span>
          </div>
          <p className="text-gray-600 mt-2">Loved by home chefs worldwide</p>
        </blockquote>
      </main>

      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-24">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-black">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Upload Photo",
                description:
                  "Take and upload a clear photo of the items in your refrigerator using your device.",
                iconColor: "text-blue-500",
                bgColor: "bg-blue-50",
              },
              {
                icon: ScanSearch,
                title: "AI-Powered Analysis",
                description:
                  "Let our AI scan the photo to identify ingredients and match them to potential recipes.",
                iconColor: "text-purple-500",
                bgColor: "bg-purple-50",
              },
              {
                icon: ChefHat,
                title: "Explore Recipes",
                description:
                  "Explore and cook personalized recipes tailored to the ingredients you have on hand.",
                iconColor: "text-emerald-500",
                bgColor: "bg-emerald-50",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6">
                  <div
                    className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mb-4 mx-auto`}
                  >
                    <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>
                <div className={`${step.bgColor} px-6 py-4`}>
                  <p
                    className={`text-sm ${step.iconColor} text-center font-medium`}
                  >
                    STEP {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQs />
      <Footer />
    </div>
  );
};

export default Landing2;
