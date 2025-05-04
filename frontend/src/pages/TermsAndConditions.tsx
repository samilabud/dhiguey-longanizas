import { FC, JSX } from "react";

const TermsAndConditions: FC = (): JSX.Element => {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Términos y Condiciones
        </h1>

        <p className="mb-4">
          Bienvenido a nuestro sitio web. Al continuar navegando y utilizando
          este sitio, aceptas cumplir y estar sujeto a los siguientes términos y
          condiciones de uso, los cuales, junto con nuestra política de
          privacidad, regulan la relación de D&apos;Higüey Longanizas y Más
          contigo.
        </p>

        <h2 className="terms-title">1. Términos</h2>
        <p className="mb-4">
          Al acceder a este sitio web, aceptas estar sujeto a estos Términos y
          Condiciones de Uso, a todas las leyes y regulaciones aplicables, y
          reconoces que eres responsable de cumplir con las leyes locales
          pertinentes.
        </p>

        <h2 className="terms-title">2. Licencia de Uso</h2>
        <p className="mb-4">
          Se concede permiso para descargar temporalmente una copia de los
          materiales (información o software) en el sitio web de D&apos;Higüey
          Longanizas y Más, únicamente para visualización personal y transitoria
          no comercial. Esto constituye la concesión de una licencia, no una
          transferencia de título.
        </p>

        <h2 className="terms-title">3. Renuncia de Responsabilidad</h2>
        <p className="mb-4">
          Los materiales en el sitio web de D&apos;Higüey Longanizas y Más se
          proporcionan &quot;tal cual&quot;. D&apos;Higüey Longanizas y Más no
          ofrece garantías, expresas o implícitas, y por la presente renuncia y
          niega todas las demás garantías.
        </p>

        <h2 className="terms-title">4. Limitaciones</h2>
        <p className="mb-4">
          En ningún caso D&apos;Higüey Longanizas y Más o sus proveedores serán
          responsables de ningún daño (incluyendo, sin limitación, daños por
          pérdida de datos o beneficios, o debido a interrupciones en el
          negocio) que surja del uso o la imposibilidad de usar los materiales
          en este sitio web.
        </p>

        <h2 className="terms-title">5. Ley Aplicable</h2>
        <p className="mb-4">
          Estos términos y condiciones se rigen e interpretan de acuerdo con las
          leyes de [Tu Estado/País] y te sometes irrevocablemente a la
          jurisdicción exclusiva de los tribunales de dicho Estado o región.
        </p>

        <p className="mt-8">
          Si tienes alguna pregunta sobre estos Términos y Condiciones, por
          favor{" "}
          <a href="/contact" className="link-button-inside-text text-base">
            contáctanos
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
