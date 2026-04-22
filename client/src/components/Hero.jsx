import { SearchBox } from "./SearchBox";

export const Hero = () => {
  return (
    <section className="relative py-28 overflow-hidden max-w-[100vw] bg-linear-to-br from-indigo-50 via-white to-purple-100">
      
      <div className="absolute -top-10 md:-top-25 left-1/2 -translate-x-1/2 w-72 h-72 md:w-125 md:h-125 bg-indigo-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-10 md:-bottom-25 right-0 w-64 h-64 md:w-100 md:h-100 bg-pink-300 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        <div className="inline-block mb-5 px-4 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full shadow-sm">
          🚀 Secure Certificate Verification
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Verify Certificates
          <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Fast, secure and reliable platform to validate certificates in seconds.
          No hassle, no delays.
        </p>

        <div className="mt-10">
          <SearchBox />
        </div>

      </div>
    </section>
  );
};

