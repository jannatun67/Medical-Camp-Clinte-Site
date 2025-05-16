const stats = [
  {
    label: "Camps Organized",
    value: 120,
    icon: "🩺",
  },
  {
    label: "Participants Served",
    value: 5200,
    icon: "👥",
  },
  {
    label: "Healthcare Professionals",
    value: 85,
    icon: "🧑‍⚕️",
  },
  {
    label: "Cities Covered",
    value: 25,
    icon: "🌍",
  },
];

const OurImpact = () => {
  return (
    <section className="bg-indigo-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Impact in Numbers
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We're proud of the difference our camps have made in communities across the country.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm py-8 px-6 border border-gray-200 hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-indigo-600">{stat.value.toLocaleString()}</h3>
            <p className="text-gray-700 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurImpact;
