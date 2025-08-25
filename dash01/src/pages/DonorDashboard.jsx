import Header from '../components/Header';
import Footer from '../components/Footer';

const students = [
  { name: "Anaya Singh", need: "Bag" },
  { name: "Rohan Mehta", need: "Pen" },
  { name: "Sara Khan", need: "Bag" }
];

export default function DonorDashboard() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Donor Dashboard</h1>
        <p className="mb-8 text-gray-700 max-w-3xl">
          Here you can see students available for donation:
        </p>
        <div className="flex flex-wrap gap-8">
          {students.map((s) => (
            <div
              key={s.name}
              className="bg-white p-6 w-full max-w-xs rounded-xl shadow-md flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2">{s.name}</h3>
              <p className="mb-4">Need: {s.need}</p>
              <a
                href="#"
                className="btn-primary mt-auto bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-center shadow-md"
              >
                Donate
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}