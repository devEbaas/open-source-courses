import { USERS } from "@/constants/users";
import Link from "next/link";

export const Testimonials = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 min-h-screen overflow-x-hidden">
        <section className="pt-16 pb-20 relative min-h-screen flex flex-col justify-center">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 floating"></div>
            <div
              className="absolute top-0 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 floating"
              style={{ animationDelay: "-2s" }}
            ></div>
            <div
              className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 floating"
              style={{ animationDelay: "-4s" }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12 px-4">
              <div className="inline-block p-2 rounded-full bg-gradient-to-r from-purple-100 to-teal-100 mb-4">
                <div className="bg-white rounded-full px-4 py-1">
                  <span className="text-xs sm:text-sm font-semibold gradient-text">
                    Historias de Éxito
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-playfair leading-tight mb-4">
                Qué opinan{" "}
                <span className="gradient-text block sm:inline">
                  Nuestros Estudiantes
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                No te quedes solo con nuestra palabra. Esto es lo que nuestros
                estudiantes tienen que decir sobre su experiencia de aprendizaje
                transformadora.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {USERS.map((user) => (
                <Testimonial
                  key={user.id}
                  name={user.name}
                  text={user.text}
                  stars="★★★★★"
                  profilePhoto={user.profilePhoto}
                  areaOfStudy={user.areaOfStudy}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  500+
                </div>
                <div className="text-gray-600 text-sm">Estudiantes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  4.9★
                </div>
                <div className="text-gray-600 text-sm">Calificación Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">15+</div>
                <div className="text-gray-600 text-sm">Áreas de Estudio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">10,000+</div>
                <div className="text-gray-600 text-sm">Hrs de contenido</div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Link
                href="/register"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              >
                <span className="relative z-10">Se parte de nuestra comunidad</span>
                <svg
                  className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-teal-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

function Testimonial({
  name,
  text,
  stars = "★★★★★",
  profilePhoto,
  areaOfStudy,
}: {
  name: string;
  text: string;
  stars: string;
  profilePhoto: string;
  areaOfStudy: string;
}) {
  return (
    <div
      className="testimonial-card relative rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="absolute top-4 left-4 quote-mark">"</div>
      <div className="p-8 pt-16">
        <div className="flex mb-6 star-rating">
          <span className="text-yellow-400 text-xl">★★★★★</span>
        </div>
        <p className="text-gray-700 mb-6 leading-relaxed italic">{text}</p>
        <div className="flex items-center">
          <div className="relative">
            <img
              src={profilePhoto}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{areaOfStudy}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {areaOfStudy}
        </div>
      </div>
    </div>
  );
}
