import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // admin, student, donor
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple role-based navigation
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'student') {
      navigate('/student-dashboard');
    } else if (role === 'donor') {
      navigate('/donor-dashboard');
    } else {
      alert('Please select a valid role!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-teal-50 to-teal-100">
      <Header />

      {/* Page Hero */}
      <section className="w-full bg-gradient-to-r from-teal-100 to-teal-200 py-12 text-center shadow-inner">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-900">
          Login
        </h1>
        <p className="mt-3 text-lg text-teal-700">
          Securely Login to access your dashboard
        </p>
      </section>

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="bg-white w-full max-w-lg p-10 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block font-medium text-teal-800 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium text-teal-800 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block font-medium text-teal-800 mb-2">Login as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="student">Receiver</option>
                <option value="donor">Donor</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white rounded-xl shadow-md hover:bg-teal-700 transform transition hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-gray-700">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-teal-600 font-semibold hover:underline">
              Register here
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
