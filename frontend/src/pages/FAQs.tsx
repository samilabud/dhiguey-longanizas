import { useState } from "react";
import { FAQsData } from "../common/data";

type Faq = {
  question: string;
  answer: string;
};
const faqs: Faq[] = FAQsData;
const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-w-full lg:min-w-2xl lg:max-w-2xl mx-auto p-4">
      <h1 className="text-5xl lg:text-3xl font-bold mb-6 text-primary">
        Preguntas Frecuentes
      </h1>
      {faqs.map((faq: Faq, index: number) => (
        <div key={index} className="border-b py-4 mt-4 lg:mt-0">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center text-left focus:outline-none cursor-pointer"
          >
            <span className="text-4xl lg:text-xl font-semibold hover:text-call-to-action">
              {faq.question}
            </span>
            <span className="text-6xl lg:text-3xl hover:text-call-to-action">
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>
          {activeIndex === index && (
            <p
              className="mt-6 lg:mt-2 text-gray-700 text-4xl lg:text-xl"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
