import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does RecipeLens AI analyze my ingradients?",
    answer:
      "RecipeLens AI uses cutting-edge AI and computer vision technology to analyze the ingredients in your uploaded photo. It identifies the items and generates recipe suggestions based on what it detects.",
  },
  {
    question: "Can I filter recipes based on my dietary preferences?",
    answer:
      "Yes, you can filter recipes to match your dietary preferences, such as vegetarian, vegan, gluten-free, or low-carb, ensuring you get recipes that suit your needs.",
  },
  {
    question: "Do I need to create an account to use RecipeLens AI?",
    answer:
      "Yes, creating an account allows you to save your favorite recipes, share personalized recommendations, and more.",
  },
  {
    question: "Is RecipeLens AI free to use?",
    answer: "Yes, RecipeLens AI is free to use",
  },
  {
    question: "Can I share recipes with others?",
    answer:
      "Absolutely! You can share your favorite recipes with friends and family through social media, email, or direct links directly from the app.",
  },
];

export default function FAQs() {
  return (
    <section id="faq" className="pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-black text-center mb-16">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <span className="text-lg font-medium text-gray-900">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
