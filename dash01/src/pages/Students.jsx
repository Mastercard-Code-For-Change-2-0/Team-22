import { useState } from "react";
import StudentCard from "../components/StudentCard";

const students = [
  { id: 1, name: "Anjali", age: 12, school: "Govt. School", need: "Books" },
  { id: 2, name: "Rahul", age: 10, school: "City Primary", need: "Uniform" },
  { id: 3, name: "Meera", age: 14, school: "High School", need: "School Fees" },
];

export default function Students() {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) =>
    s.need.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-6">Find a Student</h1>
      <input
        type="text"
        placeholder="Search by need..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 w-full mb-6 rounded-xl shadow-md text-black"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 col-span-3">No students found.</p>
        ) : (
          filtered.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))
        )}
      </div>
    </div>
  );
}
 