import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import HeaderClient from "../Client/Header";
import FooterClient from "../Client/Footer";
// import NavClient from "./client/nav"; không còn được sử dụng vì nav tích hợp banner
import { useEffect, useState } from "react";
import Banner from "../Client/Banner";

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
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-yellow-200 text-gray-900 dark:text-white">
      <div className="flex-1 mx-20 bg-gradient-to-b "  >
      <HeaderClient
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        user={user}
      />
      </div>
      {/* <NavClient /> hiện tại không còn sử dụng */}
      <Banner /> {/* Hiển thị banner ở tất cả các trang */}
      <div className="flex-1 container mx-auto bg-white dark:bg-gray-800 shadow-lg ">
        <Outlet />
      </div>
      <FooterClient />
    </main>
  );
};

export default ClientLayout;