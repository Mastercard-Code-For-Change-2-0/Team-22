export default function DonorCard({ donor }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white hover:scale-105 transition">
      <h3 className="text-xl font-bold mb-2">{donor.name}</h3>
      <p className="text-gray-300">Donates: {donor.type}</p>
    </div>
  );
}
