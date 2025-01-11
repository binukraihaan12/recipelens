import { Sparkles, Upload, FileText, Filter } from "lucide-react";

const features = [
  {
    name: "AI-Powered Recipe Generation",
    description:
      "Our advanced AI creates unique recipes based on your available ingredients.",
    icon: Sparkles,
    bgColor: "text-purple-500",
    lightColor: "bg-purple-50",
  },
  {
    name: "Easy Photo Upload",
    description:
      "Simply take a photo of your ingredients, and our AI will do the rest.",
    icon: Upload,
    bgColor: "text-blue-500",
    lightColor: "bg-blue-50",
  },
  {
    name: "Detailed Cooking Instructions",
    description:
      "Get step-by-step guidance to cook your chosen recipe with confidence.",
    icon: FileText,
    bgColor: "text-emerald-500",
    lightColor: "bg-emerald-50",
  },
  {
    name: "Customizable Filters",
    description:
      "Tailor your recipe suggestions based on dietary preferences and restrictions.",
    icon: Filter,
    bgColor: "text-red-500",
    lightColor: "bg-red-50",
  },
];

export default function Features() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="features">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-20 text-black">
        Features That Make Cooking a Breeze
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all hover:scale-95"
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-md ${feature.lightColor}`}
            >
              <feature.icon className={`w-6 h-6 ${feature.bgColor}`} />
            </div>
            <h3 className={`mt-4 text-lg font-medium text-black`}>
              {feature.name}
            </h3>
            <p className="mt-2 text-base text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
