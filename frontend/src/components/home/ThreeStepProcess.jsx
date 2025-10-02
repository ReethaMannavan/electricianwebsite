export default function ThreeStepProcess() {
  const steps = [
    {
      number: 1,
      title: "Consultation & Assessment",
      description:
        "We begin by understanding your specific needs and goals. Our experts conduct a thorough assessment to recommend the best electrical solutions tailored to your requirements.",
    },
    {
      number: 2,
      title: "Detailed Quote",
      description:
        "After assessing your needs, we provide a clear, detailed proposal outlining the recommended approach, estimated timelines, and costs, so you know exactly what to expect",
    },
    {
      number: 3,
      title: "Installation & Support",
      description:
        "Our certified team completes your project with precision and efficiency, keeping you informed every step of the way. After installation, we provide guidance and ongoing support.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold">Our Proven Three Step Process</h2>
     
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex-1 bg-white shadow-lg p-6 flex flex-col items-center text-center border-4 border-[#E25C26]"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-black font-bold text-3xl mb-4 ">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-black">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
