export default function StudentCard({ student }) {
  return (
    <div className="bg-black p-5 w-full max-w-xs rounded-xl shadow-lg student-card text-white">
      <h3 className="text-lg font-semibold">{student.name}</h3>
      <p>Age: {student.age}</p>
      <p>School: {student.school}</p>
      <p>Need: {student.need}</p>
      <a
        href="/donate"
        className="btn-primary block mt-4 text-center bg-teal-600 hover:bg-teal-700 rounded-lg py-2 transition-shadow shadow-md"
      >
        Donate
      </a>
    </div>
  );
}
