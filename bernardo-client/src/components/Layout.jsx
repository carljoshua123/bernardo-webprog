import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-zinc-950">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;