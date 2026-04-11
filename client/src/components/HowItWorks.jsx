import { Search, Eye, Download } from "lucide-react";

const steps = [
  {
    icon: <Search size={28} />,
    title: "Enter Certificate ID",
    desc: "Input your certificate ID to begin verification."
  },
  {
    icon: <Eye size={28} />,
    title: "View Details",
    desc: "Instantly view certificate details."
  },
  {
    icon: <Download size={28} />,
    title: "Download Certificate",
    desc: "Download your verified certificate."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-linear-to-br from-gray-50 to-indigo-50">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          How It Works
        </h2>

        <p className="mt-4 text-gray-600">
          Verify your certificate in just 3 simple steps
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">

          {steps.map((step, index) => (
            <div key={index} className="relative">

              {/* */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm w-8 h-8 flex items-center justify-center rounded-full shadow">
                {index + 1}
              </div>

              <div className="card-glass text-center">

                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl mb-4">
                  {step.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {step.desc}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;