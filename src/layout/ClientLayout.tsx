import { Outlet, useNavigate } from "react-router-dom";
import HeaderClient from "./client/header";
import FooterClient from "./client/footer";
import NavClient from "./client/nav";
import { useEffect, useState } from "react";

const ClientLayout = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Xóa role khi logout
    navigate("/login");
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <HeaderClient darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout} />
      <NavClient />
      <div className="flex-1 container mx-auto px-6 py-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <Outlet />
      </div>
      <FooterClient />
    </main>
  );
};

export default ClientLayout;