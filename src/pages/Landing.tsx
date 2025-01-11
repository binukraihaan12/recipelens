import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Camera, ChefHat, ScanSearch, Soup, Menu, X } from "lucide-react";
import { useState } from "react";
import Features from "@/components/FeaturesLanding";
import FAQs from "@/components/Faq";
import Landing2 from "./Landing2";

const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
    //   <div className="container mx-auto px-4 pt-20 pb-32">
    //     <div className="text-center space-y-8">
    //       <h1 className="text-5xl md:text-6xl font-bold text-black">
    //         AI Recipe Generator
    //       </h1>
    //       <p className="text-xl text-gray-600 max-w-2xl mx-auto">
    //         Transform your ingredients into delicious recipes with the power of AI.
    //         Simply upload a photo and get instant recipe suggestions.
    //       </p>
    //       <div className="flex justify-center">
    //         <Link to="/app">
    //           <Button size="lg" className="gap-2">
    //             Get Started <ArrowRight className="w-4 h-4" />
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div className="flex flex-col min-h-screen">
    //   <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 max-w-6xl mx-auto w-full relative">
    //     <Link to="/">
    //       <h2 className="flex items-center justify-center">
    //         <ChefHat className="h-7 w-7 mr-2 text-black" />
    //         <span className="font-bold text-black text-xl">RecipeLens AI</span>
    //       </h2>
    //     </Link>

    //     <button
    //       className="ml-auto md:hidden"
    //       onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    //     >
    //       {isMobileMenuOpen ? (
    //         <X className="h-6 w-6 text-black" />
    //       ) : (
    //         <Menu className="h-6 w-6 text-black" />
    //       )}
    //     </button>

    //     <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
    //       <a
    //         className="text-base font-medium text-black hover:text-black transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-200"
    //         href="#how-it-works"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           document.querySelector("#how-it-works")?.scrollIntoView({
    //             behavior: "smooth",
    //           });
    //         }}
    //       >
    //         How It Works
    //       </a>
    //       <a
    //         className="text-base font-medium text-black transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-200"
    //         href="#testimonials"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           document.querySelector("#features")?.scrollIntoView({
    //             behavior: "smooth",
    //           });
    //         }}
    //       >
    //         Features
    //       </a>
    //     </nav>

    //     {isMobileMenuOpen && (
    //       <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 md:hidden z-50">
    //         <nav className="flex flex-col p-4">
    //           <a
    //             className="text-base font-medium text-black py-2 transition-all duration-200  hover:translate-x-1 relative hover:pl-2"
    //             href="#how-it-works"
    //             onClick={(e) => {
    //               e.preventDefault();
    //               document.querySelector("#how-it-works")?.scrollIntoView({
    //                 behavior: "smooth",
    //               });
    //               setIsMobileMenuOpen(false);
    //             }}
    //           >
    //             How It Works
    //           </a>
    //           <a
    //             className="text-base font-medium text-black py-2 transition-all duration-200 hover:translate-x-1 relative hover:pl-2"
    //             href="#testimonials"
    //             onClick={(e) => {
    //               e.preventDefault();
    //               document.querySelector("#features")?.scrollIntoView({
    //                 behavior: "smooth",
    //               });
    //               setIsMobileMenuOpen(false);
    //             }}
    //           >
    //             Features
    //           </a>
    //         </nav>
    //       </div>
    //     )}
    //   </header>
    //   <main className="flex-1">
    //     <section className="w-full py-12 md:py-24 lg:py-32 xl:py-32 bg-white">
    //       <div className="container px-4 md:px-6 max-w-5xl mx-auto">
    //         <div className="flex flex-col items-center space-y-4 text-center">
    //           <div className="space-y-4">
    //             <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black">
    //               Turn Your Fridge into a Culinary Adventure
    //             </h1>
    //             <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
    //               Upload a photo of your ingredients, and let our AI suggest
    //               delicious recipes tailored just for you.
    //             </p>
    //           </div>
    //           <div className="flex gap-5 pt-3">
    //             <Link to="/app">
    //               <Button
    //                 className="bg-black text-white hover:bg-gray-800 rounded-lg"
    //                 size="lg"
    //               >
    //                 Start Cooking <Soup />
    //               </Button>
    //             </Link>
    //             <Link to="https://youtu.be/XU1ctYbZ8vI?si=ux_X-BxkQ782Pnyw">
    //               <Button size="lg" variant="ghost">
    //                 Watch a demo <ArrowRight />
    //               </Button>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    //     {/*How it works*/}
    //     <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-24">
    //       <div className="container px-4 md:px-6 max-w-5xl mx-auto">
    //         <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-black">
    //           How It Works
    //         </h2>
    //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //           {[
    //             {
    //               icon: Camera,
    //               title: "Upload Photo",
    //               description:
    //                 "Take and upload a clear photo of the items in your refrigerator using your device.",
    //               iconColor: "text-blue-500",
    //               bgColor: "bg-blue-50",
    //             },
    //             {
    //               icon: ScanSearch,
    //               title: "AI-Powered Analysis",
    //               description:
    //                 "Let our AI scan the photo to identify ingredients and match them to potential recipes.",
    //               iconColor: "text-purple-500",
    //               bgColor: "bg-purple-50",
    //             },
    //             {
    //               icon: ChefHat,
    //               title: "Explore Recipes",
    //               description:
    //                 "Explore and cook personalized recipes tailored to the ingredients you have on hand.",
    //               iconColor: "text-emerald-500",
    //               bgColor: "bg-emerald-50",
    //             },
    //           ].map((step, index) => (
    //             <div
    //               key={index}
    //               className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
    //             >
    //               <div className="p-6">
    //                 <div
    //                   className={`w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mb-4 mx-auto`}
    //                 >
    //                   <step.icon className={`w-8 h-8 ${step.iconColor}`} />
    //                 </div>
    //                 <h3 className="text-xl font-bold mb-2 text-black text-center">
    //                   {step.title}
    //                 </h3>
    //                 <p className="text-gray-600 text-center">
    //                   {step.description}
    //                 </p>
    //               </div>
    //               <div className={`${step.bgColor} px-6 py-4`}>
    //                 <p
    //                   className={`text-sm ${step.iconColor} text-center font-medium`}
    //                 >
    //                   STEP {index + 1}
    //                 </p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </section>

    //     {/*Features section */}
    //     <section className="w-full py-12 bg-white">
    //       <Features />
    //     </section>

    //     {/*Testimontial section */}
    //     {/* <section
    //       id="testimonials"
    //       className="w-full py-12 md:py-24 lg:py-32 bg-white"
    //     >
    //       <div className="container px-4 md:px-6 max-w-5xl mx-auto">
    //         <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-black">
    //           What Our Users Say
    //         </h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //           {[1, 2, 3].map((_, index) => (
    //             <div
    //               key={index}
    //               className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200"
    //             >
    //               <p className="text-gray-600 mb-4">
    //                 "RecipeLens AI has revolutionized my cooking! I never waste
    //                 food anymore, and I've discovered so many new recipes."
    //               </p>
    //               <div className="flex items-center">
    //                 <img
    //                   src={`/placeholder.svg?height=40&width=40`}
    //                   alt="User avatar"
    //                   className="rounded-full mr-4 w-10 h-10"
    //                 />
    //                 <div>
    //                   <p className="font-semibold text-black">Happy User</p>
    //                   <p className="text-sm text-gray-500">Food Enthusiast</p>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </section> */}

    //     {/*FAQs section */}
    //     <section>
    //       <FAQs />
    //     </section>
    //   </main>
    //   <footer className="w-full py-6 bg-gray-100 border-t border-gray-200">
    //     <div className="container px-4 md:px-6 max-w-5xl mx-auto">
    //       <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
    //         <p className="text-xs text-gray-500">
    //           © 2024 RecipeLens AI. All rights reserved.
    //         </p>
    //         <nav className="flex gap-4 sm:gap-6">
    //           <a
    //             className="text-xs text-gray-500 hover:underline underline-offset-4"
    //             href="#"
    //           >
    //             Terms of Service
    //           </a>
    //           <a
    //             className="text-xs text-gray-500 hover:underline underline-offset-4"
    //             href="#"
    //           >
    //             Privacy
    //           </a>
    //         </nav>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
    <Landing2 />
  );
};

export default Landing;
