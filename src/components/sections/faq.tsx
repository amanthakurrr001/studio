import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How does the AI quiz generation work?",
    answer: "Our AI uses Google's Gemini model to understand your topic and generate relevant questions, options, and answers based on the difficulty and length you specify.",
  },
  {
    question: "Do I need my own API key?",
    answer: "Yes, to use the AI generation feature, you'll need to provide your own Gemini API key. This ensures your usage is private and secure. We provide a link to get your key from Google AI Studio.",
  },
  {
    question: "Can I download my quizzes?",
    answer: "Absolutely! You can download any quiz you create or generate in various formats like PDF, JSON, or plain text for offline use or sharing.",
  },
  {
    question: "How is my progress tracked?",
    answer: "Every quiz you play is saved to your history. Our platform analyzes your scores to provide visual charts of your progress, helping you see your learning journey.",
  },
];

export function Faq() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions? We've got answers.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
