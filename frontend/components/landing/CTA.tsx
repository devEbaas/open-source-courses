import Link from "next/link";

export const Cta = () => {
  return (
    <>
      <section>
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
          <div className="flex w-full mx-auto text-left">
            <div className="relative inline-flex items-center mx-auto align-middle">
              <div className="text-center">
                <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-gray-900 md:text-5xl lg:text-6xl lg:max-w-7xl">
                  Inscríbete para obtener <br className="hidden lg:block" />
                  acceso a todos los cursos
                </h1>
                <p className="max-w-xl mx-auto mt-8 leading-relaxed text-base sm:text-lg md:text-xl text-gray-600">
                  Cursos nivel profesional, creados por expertos de cada área y
                  lo mejor es que ¡son totalmente gratuitos! Olvídate de pagar
                  por cursos, aquí encontrarás contenido de calidad, tienes todo
                  lo que necesitas para aprender y crecer.
                </p>
                <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                  <Link
                    href="/register"
                    className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                  >
                    <span>Regístrate gratis</span>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
