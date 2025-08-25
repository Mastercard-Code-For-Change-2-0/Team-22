import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
      <nav className="flex justify-between items-center px-8 py-4">
        <Link to="/" className="text-xl font-bold text-teal-400">
     DonorConnect 
        </Link>
        <div className="flex gap-6 text-white font-medium">
           <Link to="/" className="hover:text-teal-400">Home</Link>
          <Link to="/about" className="hover:text-teal-400">About</Link>
          <Link to="/student-dashboard" className="hover:text-teal-400">Recievers</Link>
          <Link to="/donors" className="hover:text-teal-400">Donors</Link>
          
          <Link to="/login" className="hover:text-teal-400">Login</Link>
        </div>
      </nav>
    </header>
  );
}
