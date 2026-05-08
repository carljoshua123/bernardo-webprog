import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full px-4 py-6 md:px-8">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;