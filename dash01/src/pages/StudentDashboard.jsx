import { useState } from "react";
import { BookOpen, DollarSign, Clock, CheckCircle } from "lucide-react";

// Dummy applications data
const applications = [
  { id: 1, title: "Laptop for Computer Science", Donor: "Ramesh Kumar", status: "Approved", date: "2025-01-15" },
  { id: 2, title: "Textbooks for Semester", Donor: "Priya sharma", status: "Pending", date: "2025-01-20" },
  
];

// Stats cards
const stats = [
  { icon: DollarSign, label: "Total Received", value: "$800", color: "green" },
  { icon: Clock, label: "Pending Requests", value: "2", color: "yellow" },
  { icon: CheckCircle, label: "Approved", value: "1", color: "blue" },
  { icon: BookOpen, label: "Academic Year", value: "2024-25", color: "purple" }
];

// Dummy students data
const students = [
  { id: 1, name: "Anjali", age: 12, school: "Govt. School", need: "Books" },
  { id: 2, name: "Rahul", age: 10, school: "City Primary", need: "Uniform" },
  { id: 3, name: "Meera", age: 14, school: "High School", need: "School Fees" }
];

// Simple Student Card Component
function StudentCard({ student }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
      <p className="text-gray-700">Age: {student.age}</p>
      <p className="text-gray-700">School: {student.school}</p>
      <p className="text-emerald-600 font-semibold">Need: {student.need}</p>
    </div>
  );
}

export default function StudentDashboard() {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) =>
    s.need.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-8 flex flex-col gap-12">

        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Receiver Dashboard</h1>
          <p className="text-gray-600">Track your funding requests and explore students’ needs</p>
        </header>

        {/* Stats Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`bg-${stat.color}-100 p-3 rounded-full`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg font-semibold transition-colors duration-200">
                Submit New Request
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold transition-colors duration-200">
                Update Profile
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-semibold transition-colors duration-200">
                View Resources
              </button>
            </div>
          </div>
        </section>

        {/* Applications Table */}
        <section>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">My Funding Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600">{app.Donor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            app.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : app.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Students Finder */}
        <section>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Find a Student</h2>
            <div className="flex justify-center mb-6">
              <input
                type="text"
                placeholder="Search by need..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-3 w-full md:w-2/3 rounded-xl shadow-md text-black"
              />
            </div>
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
        </section>

      </div>
      
    </div>
  );
}
