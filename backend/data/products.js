const products = [
  {
    id: 1,
    name: "Longaniza Artesanal",
    description:
      "Deliciosa longaniza elaborada con ingredientes 100% naturales, cuidadosamente empacada al vacío para conservar su frescura y sabor.",
    price_dop: 360.0,
    price_usd: 6,
    image: "/images/sausage_pkg.png",
    available: true,
    selling_by: "el paquete (3)",
  },

  {
    id: 2,
    name: "Tocino de Cerdo",
    description:
      "Jugoso y sabroso tocino de cerdo, perfecto para disfrutar en desayunos, parrilladas o como complemento en tus recetas favoritas. Elaborado con cortes seleccionados, ofrece un equilibrio ideal entre carne y grasa para un sabor inigualable.",
    price_dop: 300.0,
    price_usd: 5,
    image: "/images/bacon_unpackage.png",
    available: true,
    selling_by: "la libra",
  },
  {
    id: 3,
    name: "Queso de Higüey",
    description:
      "Auténtico Queso hoja, famoso por su textura suave y fibrosa. Su sabor delicado y ligeramente salado lo hace perfecto para disfrutar solo, derretido en mofongos, tostones o acompañado de tu comida favorita. Elaborado artesanalmente para ofrecer la mejor calidad y frescura. check",
    price_dop: 360.0,
    price_usd: 6,
    image: "/images/higueyano_cheese.png",
    available: false,
    selling_by: "la libra",
  },
];

export const shippingOptions = [
  { label: "Distrito Nacional", costDOP: 300, costUSD: 5 },
  { label: "Santo Domingo Este", costDOP: 200, costUSD: 3.5 },
  { label: "Santo Domingo Norte", costDOP: 300, costUSD: 5 },
  { label: "Santo Domingo Oeste", costDOP: 340, costUSD: 5.7 },
  { label: "Interior del País", costDOP: 380, costUSD: 6.3 },
  { label: "Resto de Santo Domingo check", costDOP: 440, costUSD: 7.3 },
];
export default products;
