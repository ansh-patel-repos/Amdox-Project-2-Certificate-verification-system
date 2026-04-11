import { ShieldCheck, Zap, FileText } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Verification",
    desc: "Your certificate data is protected with secure authentication."
  },
  {
    icon: <Zap size={28} />,
    title: "Instant Results",
    desc: "Verify certificates in seconds with our fast system."
  },
  {
    icon: <FileText size={28} />,
    title: "Easy Download",
    desc: "Download verified certificates instantly."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Powerful Features
        </h2>

        <p className="mt-4 text-gray-600">
          Everything you need to verify certificates quickly and securely
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {features.map((item, index) => (
            <div
              key={index}
              className="card-glass text-center hover:scale-105 transition duration-300"
            >

              <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl mb-4 mx-auto">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-600 text-sm">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;