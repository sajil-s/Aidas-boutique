

import { Outlet } from "react-router-dom";
import Navbar from "../components/layouts/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";

function MainLayout() {
  return (
    <div className="min-h-screen bg-bone flex flex-col w-full">
      <Navbar />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          <Outlet />
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default MainLayout;
