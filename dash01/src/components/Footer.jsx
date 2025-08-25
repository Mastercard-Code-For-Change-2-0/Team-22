import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import FeedbackForm from './FeedbackForm';

export default function Footer() {
  return (
    <footer className="bg-teal-800 text-white py-10 px-8 w-full">
      <div className="max-w-7xl mx-auto">
        <FeedbackForm />

        <div className="flex flex-col md:flex-row justify-between gap-8 mt-10">
          {/* About */}
          <div className="md:w-1/3">
            <h2 className="text-xl font-bold mb-4">DonorConnect</h2>
            <p className="text-gray-300">
              Empowering students by connecting donors directly with those in need of educational funding.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <FaPhone className="text-teal-400" /> <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-teal-400" /> <span>support@donorconnect.org</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-teal-400" /> <span>123 Charity Lane, Cityville, USA</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-6 text-gray-300 text-2xl">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white"><FaFacebook /></a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-400 text-sm">
          &copy; 2025 DonorConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
