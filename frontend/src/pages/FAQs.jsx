import { useState } from "react";

const faqs = [
  {
    question: "¿Cuál es el horario de atención?",
    answer:
      "Nuestro horario de atención es de lunes a viernes de 9:00 a.m. a 6:00 p.m.",
  },
  {
    question: "¿Cómo puedo realizar una compra?",
    answer:
      "Puedes agregar los productos a tu carrito y seguir el proceso de pago para completar tu compra.",
  },
  {
    question: "¿Ofrecen envíos a todo el país?",
    answer:
      "Sí, realizamos envíos a todas las regiones. Los costos y tiempos de entrega varían según la ubicación.",
  },
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b py-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center text-left focus:outline-none"
          >
            <span className="text-xl font-semibold">{faq.question}</span>
            <span className="text-3xl">
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>
          {activeIndex === index && (
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
