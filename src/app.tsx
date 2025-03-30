import "./app.css";
import { useRoutes, Navigate } from "react-router-dom";
import "./index.css";
import Welcome from "./components/Welcome";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import ClientLayout from "./layout/ClientLayout";
import Home from "./components/client/Home";
import ProductList from "./components/admin/Product";
import ProductAdd from "./components/admin/ProductAdd";
import ProductEdit from "./components/admin/ProductEdit";
import ProductDetail from "./components/admin/ProductDetail";
import GameNameList from "./components/admin/GameName";
import GameNameAdd from "./components/admin/GameNameAdd";
import GameNameEdit from "./components/admin/GameNameEdit";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// ProtectedRoute dùng role từ localStorage
const ProtectedRoute = ({ children, requiresAdmin = false }: { children: JSX.Element; requiresAdmin?: boolean }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiresAdmin && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const routes = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/welcome", element: <Welcome /> },
    {
      path: "/admin",
      element: <ProtectedRoute requiresAdmin={true}><AdminLayout /></ProtectedRoute>,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "products", element: <ProductList /> },
        { path: "products/add", element: <ProductAdd /> },
        { path: "products/edit/:id", element: <ProductEdit /> },
        { path: "products/:id", element: <ProductDetail /> },
        { path: "gamenames", element: <GameNameList /> },
        { path: "gamenames/add", element: <GameNameAdd /> },
        { path: "gamenames/edit/:id", element: <GameNameEdit /> },
      ],
    },
    {
      path: "/",
      element: <ProtectedRoute><ClientLayout /></ProtectedRoute>,
      children: [
        { path: "", element: <Home /> },
      ],
    },
  ]);
  return routes;
}

export default App;