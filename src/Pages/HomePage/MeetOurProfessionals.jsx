const professionals = [
  {
    name: "Dr. Sarah Ahmed",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. James Patel",
    specialty: "Pediatrician",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Dr. Olivia Kim",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Dr. Ethan Rodriguez",
    specialty: "General Physician",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

const MeetOurProfessionals = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Meet Our Healthcare Professionals
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          Experienced, compassionate, and dedicated — our team ensures quality care during every camp.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {professionals.map((pro, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 text-center p-6"
          >
            <img
              src={pro.image}
              alt={pro.name}
              className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-indigo-200 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{pro.name}</h3>
            <p className="text-indigo-600">{pro.specialty}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurProfessionals;
