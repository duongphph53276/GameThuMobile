import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import SidebarAdmin from "../Admin/Sidebar";
import { useEffect, useState } from "react";
import HeaderAdmin from "../Admin/Header";
import FooterAdmin from "../Admin/Footer";

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Trạng thái đăng nhập
  const [user, setUser] = useState(null); // Thông tin user từ backend
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

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
          if (data.status && data.user.role === "admin") { // Kiểm tra role admin
            setIsLoggedIn(true);
            setUser(data.user);
          } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            navigate("/login"); // Chuyển hướng nếu không phải admin hoặc token không hợp lệ
          }
        } catch (error) {
          console.error("Lỗi khi xác thực token:", error);
          setIsLoggedIn(false);
          navigate("/login");
        }
      } else {
        setIsLoggedIn(false);
        navigate("/login"); // Không có token thì chuyển về login
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

  if (!isLoggedIn) {
    return null; // Không render gì trong khi chờ xác thực, tránh flash giao diện
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white">
      <HeaderAdmin
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        user={user} // Truyền thông tin user xuống HeaderAdmin
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 shadow-lg">
          <SidebarAdmin />
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Outlet context={{ darkMode }} />
        </div>
      </div>
      <FooterAdmin />
    </main>
  );
};

export default AdminLayout;