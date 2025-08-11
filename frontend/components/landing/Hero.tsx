import Link from "next/link";

export const Hero = () => {
  return (
    <div>
      <div
        className="items-center w-12/12 grid-cols-2 mx-auto overflow-x-hidden lg:grid md:py-14 pb-0 lg:py-24 xl:py-14 lg:mt-3 xl:mt-5"
        data-aos="fade-right"
        data-aos-duration="800"
      >
        <div className="pr-2 md:mb-14 py-14 md:py-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-playfair leading-tight 2xl:leading-tight 2xl:max-w-4xl">
            <span className="block w-full">Aprende con una plataforma</span>{" "}
            Open Source
          </h1>
          <p className="py-4 2xl:py-8 md:py-6 2xl:pr-5 text-base sm:text-lg md:text-xl text-gray-600">
            Aprende con cursos interactivos y prácticos diseñados para mejorar
            tus habilidades y conocimientos de manera progresiva, segura y sobre
            todo efectiva.
          </p>
          <div className="mt-4">
            <Link
              href="/register"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <span>¡Comienza ya!</span>{" "}
            </Link>
          </div>
        </div>

        <div className="pb-10 overflow-hidden md:p-10 lg:p-0 sm:pb-0">
          <img
            id="heroImg1"
            className="transition-all duration-300 ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
            src="https://bootstrapmade.com/demo/templates/FlexStart/assets/img/hero-img.png"
            alt="Awesome hero page image"
            width="500"
            height="488"
          />
        </div>
      </div>
      <div className="mt-0 grid gap-6 sm:grid-cols-3">
        <Feature
          title="Open Source"
          desc="Cursos gratuitos y accesibles para todos."
        />
        <Feature
          title="Especializado"
          desc="Cursos diseñados para necesidades específicas."
        />
        <Feature
          title="Certificado de Finalización"
          desc="Obtén un certificado al completar el curso."
        />
      </div>
    </div>
  );
};

function Feature({ title, desc }: { title: string; desc: string }) {
  // Card rounded with border and shadow
  return (
    <div className="rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}