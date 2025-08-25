import { useNavigate } from 'react-router-dom';

export default function ChooseLogin() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-800 to-gray-900 px-4">
      <h1 className="text-5xl font-bold mb-16 text-white text-center">Login as</h1>
      <div className="flex flex-row gap-8 w-full max-w-md justify-center flex-wrap">
        {['admin', 'receiver', 'user'].map((role) => (
          <button
            key={role}
            onClick={() => navigate(`/login/${role}`)}
            className="flex-1 min-w-[120px] py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-lg font-semibold text-lg text-center"
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
