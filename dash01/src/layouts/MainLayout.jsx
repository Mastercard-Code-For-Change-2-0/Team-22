import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="pt-20 px-6">
        <Outlet />
      </main>
    </div>
  );
}
