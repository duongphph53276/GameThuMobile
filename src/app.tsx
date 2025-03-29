import "./app.css";
import { useRoutes, useParams } from "react-router-dom";
import "./index.css"
import Welcome from "./components/Welcome";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./components/admin/Dashboard";

function App() {
  const routes = useRoutes([
        { path: '/', element: <Welcome /> },
        {path: '/admin', element: <AdminLayout />, children:[
          {path:'', element:<Dashboard/>},
        ] },

    // { path: '/register', element: <Register /> },
    // { path: '/login', element: <Login /> },
    // {path: '/dashboard',element: <AdminLayout />,children: [
    //     { path: '', element: <Dashboard /> },
    //     { path: 'products', element: <Home /> },
    //     { path: 'addproducts', element: <AddProducts /> },
    //     { path: 'editproducts/:id', element: <EditProducts /> },
    //     { path: 'orders', element: <ListOrders /> },
    //     { path: 'addorders', element: <AddOrders /> },
    //     { path: 'category', element: <ListCategory /> },
    //     { path: 'addcategory', element: <AddCategory /> },
    //     { path: 'product/:id', element: <ProductDetail /> },
    //     { path: 'editcategory/:id', element: <EditCategory /> },
    //     { path: 'products/:id', element: <ProductDetail /> },
    //   ],
    // },
    // { path: '/client', element: <HomeClient /> },
    // { path: '/client/products/:id', element: <ProductDetail /> },
    // { path: '/client/:id', element: <DetailWrapper /> }, // Sử dụng wrapper
    // { path: '/client/category/:id', element: <SearchCategory /> }  
    ]);
  return routes;
}

export default App;