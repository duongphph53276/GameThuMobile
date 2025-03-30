import { Outlet } from "react-router-dom";
import SidebarAdmin from "./admin/sidebar"; // Đảm bảo tên file khớp
import { useEffect, useState } from "react";
import HeaderAdmin from "./admin/header";
import FooterAdmin from "./admin/footer";

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

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
    <main className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white">
      <HeaderAdmin darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar cố định */}
        <div className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 shadow-lg">
          <SidebarAdmin />
        </div>
        {/* Nội dung chính */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Outlet context={{ darkMode }} />
        </div>
      </div>
      <FooterAdmin />
    </main>
  );
};

export default AdminLayout;