import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import HeaderClient from "./client/header";
import FooterClient from "./client/footer";
import NavClient from "./client/nav";
import { useEffect, useState } from "react";
import Notification from "./client/Notification";

const ClientLayout = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/verify-token", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.status) {
            setIsLoggedIn(true);
            setUser(data.user);
          } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            // Chỉ chuyển hướng nếu không ở trang chủ
            if (location.pathname !== "/") {
              navigate("/login");
            }
          }
        } catch (error) {
          console.error("Lỗi khi xác thực token:", error);
          setIsLoggedIn(false);
          if (location.pathname !== "/") {
            navigate("/login");
          }
        }
      } else {
        setIsLoggedIn(false);
        // Không chuyển hướng nếu ở trang chủ
        if (location.pathname !== "/") {
          navigate("/login");
        }
      }
    };

    verifyToken();
  }, [navigate, location.pathname]); // Thêm location.pathname vào dependency

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
      <HeaderClient
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      <NavClient />
      <Notification/>
      <div className="flex-1 container mx-auto px-6 py-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <Outlet />
      </div>
      <FooterClient />
    </main>
  );
};

export default ClientLayout;