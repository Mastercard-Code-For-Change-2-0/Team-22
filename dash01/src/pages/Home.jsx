import Header from "../components/Header";
import Footer from "../components/Footer";
import StudentCard from "../components/StudentCard";

const students = [
  { id: 1, name: "Anaya Singh", age: 16, school: "Delhi High School", need: "$200" },
  { id: 2, name: "Rohan Mehta", age: 17, school: "Mumbai Public School", need: "$300" },
  { id: 3, name: "Sara Khan", age: 15, school: "Pune Academy", need: "$150" },
];

export default function Home() {
  const steps = [
    {
      title: "1. Students Apply",
      desc: "Students submit their funding requests with details of their educational needs.",
    },
    {
      title: "2. Donors Contribute",
      desc: "Donors choose students and make secure contributions online.",
    },
    {
      title: "3. Admin Verifies",
      desc: "Admins verify transactions and ensure funds reach the right students.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F5F5F5]">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between w-full bg-gradient-to-r from-[#FFEDD5] to-[#FFE5B4] py-20 px-8 md:px-16">
        <div className="flex-1 flex flex-col space-y-6 text-left animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-[#1F4E79] leading-tight">
            Empower NEEDY, Change Lives
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-xl">
            Connect donors with students in need of educational funding. Make a difference today!
          </p>
          <div className="flex gap-4">
            <a
              href="/donate"
              className="bg-[#FF7F00] hover:bg-[#e76e00] text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              Donate Now
            </a>
            <a
              href="/donate"
              className="bg-[#1F4E79] hover:bg-[#16395c] text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              Receive Now
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0">
          <img
            src="https://imgs.search.brave.com/t_3J116Tla_Gn14x7MflsOkO-DB-6ZFsxQc6C_WsZvk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFpc3VzLmNv/bS9Eb2N1bWVudC9O/R08vMDlhMzNlOWU2/MC5qcGc"
            alt="Students"
            className="w-full max-w-md rounded-3xl shadow-2xl animate-fadeIn"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-8 md:px-16 py-16 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1F4E79]">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-[#FFEDD5] p-8 rounded-2xl w-64 shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <h3 className="font-semibold text-xl mb-3 text-[#FF7F00]">{step.title}</h3>
              <p className="text-gray-700">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Students in Need Section */}
      <section className="w-full px-8 md:px-16 py-16 bg-[#FFE5B4] text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1F4E79]">Students in Need</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              className="hover:scale-105 transition-transform transform"
            />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full px-8 md:px-16 py-16 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1F4E79]">What People Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-[#FFEDD5] p-8 rounded-2xl w-80 shadow-md hover:shadow-xl">
            <p className="text-gray-700 italic mb-4">
              "This platform helped me get the resources I needed for my studies!"
            </p>
            <h3 className="font-semibold text-lg text-[#FF7F00]">- Anaya Singh</h3>
          </div>
          <div className="bg-[#FFEDD5] p-8 rounded-2xl w-80 shadow-md hover:shadow-xl">
            <p className="text-gray-700 italic mb-4">
              "I'm glad I could help students pursue their dreams."
            </p>
            <h3 className="font-semibold text-lg text-[#FF7F00]">- Rajesh Kumar</h3>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://projectheena.com/uploads/ngo/37158081944768/overviewImages/images/1580819447.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug text-white">
            Support a Student. Shape a Future.
          </h1>
          <a
            href="#apply"
            className="mt-6 inline-block bg-[#FF7F00] hover:bg-[#e76e00] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            
          </a>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gradient-to-b from-white to-[#F5F5F5] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-[#1F4E79] mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Inspired by <span className="font-semibold text-[#FF7F00]">Katalyst</span>, our journey began with a mission
            to empower and uplift individuals through education, innovation, and mentorship.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://sevasahayog.org/wp-content/uploads/2023/04/volunteer-img-2.webp"
            alt="Our Story"
            className="rounded-2xl shadow-lg"
          />
          <div className="text-left">
            <h3 className="text-2xl font-bold text-[#1F4E79] mb-4">Building a Movement</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We started by creating a strong foundation for growth, nurturing talent, fostering leadership, and
              providing access to resources. Over the years, our impact has expanded, creating a ripple effect of change
              in communities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we carry this vision forward, supporting a network of innovators and leaders shaping the future.
              Our story reflects resilience, collaboration, and a shared dream to create meaningful change.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
