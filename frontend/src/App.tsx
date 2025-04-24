import "./app.css";
import { useRoutes, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminLayout from "./layout/Main/AdminLayout.main";
import Dashboard from "./components/Admin/Setting/Dashboard";
import ProductList from "./components/Admin/Product/Product";
import ProductAdd from "./components/Admin/Product/ProductAdd";
import ProductEdit from "./components/Admin/Product/ProductEdit";
import ProductDetail from "./components/Admin/Product/ProductDetail";
import GameNameList from "./components/Admin/GameName/GameName";
import GameNameAdd from "./components/Admin/GameName/GameNameAdd";
import GameNameEdit from "./components/Admin/GameName/GameNameEdit";
import UserList from "./components/Admin/User/User";
import UserEdit from "./components/Admin/User/UserEdit";
import ClientLayout from "./layout/Main/ClientLayout.main";
import Home from "./components/Client/HomePage/Home";
import Cart from "./components/Client/Account/Cart";
import Profile from "./components/Client/Account/Profile";
import ProfileEdit from "./components/Client/Account/ProfileEdit";
import NotFound from "./components/404/NotFound";

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

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
};

function App() {
  const routes = useRoutes([
    { path: "/login", element: <AuthGuard><Login/></AuthGuard> },
    { path: "/register", element: <AuthGuard><Register/></AuthGuard> },
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
        { path: "users", element: <UserList /> },
        { path: "users/edit/:id", element:<UserEdit/>},
      ],
    },
    {
      path: "/",
      element:<ClientLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: "client/edit", element: <ProtectedRoute><ProfileEdit /></ProtectedRoute> },
      ],
    },
    { path:"/404", element:<NotFound/> },
    { path: "*", element: <NotFound /> },
    ]);
  return routes;
}

export default App;