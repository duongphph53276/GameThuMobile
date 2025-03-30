import { Outlet } from "react-router-dom";
import HeaderClient from "./client/header";
import FooterClient from "./client/footer";
import NavClient from "./client/nav";

const ClientLayout = () => {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <HeaderClient />
      <NavClient />
      <div className="flex-1 container mx-auto px-6 py-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <Outlet />
      </div>
      <FooterClient />
    </main>
  );
};

export default ClientLayout;
