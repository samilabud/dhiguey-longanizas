import { useState } from "react";

const faqs = [
  {
    question: "¿Ofrecen envíos a todo el país?",
    answer:
      "Sí, realizamos envíos a todas las regiones. Los costos y tiempos de entrega varían según la ubicación.",
  },
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
  {
    question: "¿Cuáles son las características de los productos?",
    answer:
      "Nuestros productos son 100% naturales, sin conservantes sintéticos y sin colorantes artificiales. Vienen empacados al vacío para preservar su frescura y calidad.",
  },
  {
    question: "¿Con qué se preparan nuestras longanizas?",
    answer:
      "Nuestras longanizas se elaboran con condimentos naturales, como sal, ajao, orégano, naranja agria y ajíes longanizeros, lo que las hace 100% naturales. Además, para su preparación se utiliza únicamente tripa de cerdo, sin colorantes ni conservantes sintéticos o artificiales.",
  },
  {
    question: "¿Cuál es el origen de las longanizas higüeyanas?",
    answer: `La longaniza es parte de la herencia de miles de personas en Santana, Higüey, donde muchas de las recetas más atesoradas no solo reflejan una gran parte de la identidad del pueblo, sino que también evidencian claramente los orígenes de sus tradiciones y cultura. 
    Esta longaniza figura entre los nominados a los Gourmand World Cookbook Awards y su historia se puede apreciar mejor leyendo el libro "Longaniza Dominicana" (subtitulado como “La mejor longaniza del Caribe”) por Féliz-Camilo. 
    Más información en: <a href="https://shorturl.at/1J7xZ" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">aquí</a>.`,
  },
  {
    question: "¿Cómo se venden las longanizas higüeyanas en Santana, Higüey?",
    answer: `La longaniza es vendida por personas humildes en negocios familiares o en el mercado local. 
    Puedes ver cómo luce en la mayoría de los negocios en Santana en el siguiente enlace: 
    <a href="https://shorturl.at/ND9Ir" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">aquí</a>.`,
  },
];

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-w-full lg:min-w-2xl lg:max-w-2xl mx-auto p-4">
      <h1 className="text-5xl lg:text-3xl font-bold mb-6 text-primary">
        Preguntas Frecuentes
      </h1>
      {faqs.map((faq, index) => (
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
