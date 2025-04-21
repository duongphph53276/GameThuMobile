import { Link } from "react-router-dom";
import GameDropdown from './gamedropdown';


const Banner = () => {
  return (
    <div className="relative banner">
    <img
        className="w-full h-auto object-cover"
        src="uploads/banner2.png"
        alt="Banner"
      />

      {/* Tiêu đề trên banner */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg shadow-lg">
        🎮 Chào mừng đến với KingGameMobile - Nơi tài khoản game mobile hội tụ!
      </div>

      {/* Nav Links (dùng Link thay button) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <Link
          to="/"
          className="bg-transparent hover:bg-gray-600 text-white px-8 py-4 rounded-md shadow-md transition border-x border-white border-opacity-30"
        >
          Trang chủ
        </Link>
        <GameDropdown />
        <Link
          to="/support"
          className="bg-transparent hover:bg-gray-600 text-white px-8 py-4 rounded-md shadow-md transition border-x border-white border-opacity-30"
        >
          Góp ý
        </Link>
        <Link
          to="/policy"
          className="bg-transparent hover:bg-gray-600 text-white px-8 py-4 rounded-md shadow-md transition border-x border-white border-opacity-30"
        >
          Chính sách
        </Link>
        <Link
          to="/contact"
          className="bg-transparent hover:bg-gray-600 text-white px-8 py-4 rounded-md shadow-md transition border-x border-white border-opacity-30"
        >
          Liên hệ
        </Link>
      </div>
    </div>
  );
};

export default Banner;
