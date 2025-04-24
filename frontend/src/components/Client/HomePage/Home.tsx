import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Tự động ẩn popup sau 5 giây (nếu muốn)
  }, []);

  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Đây là trang chủ của website." />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-2xl w-[800px] p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">📢 Thông báo</h2>
            <p className="mb-4">
              Xin chào các game thủ! 🎮 <br />
              Chào mừng bạn đến với KingGameMobile - Nơi hội tụ những tài khoản game mobile quá vip.
              <br /><br />
              📌 Chúng tôi vừa cập nhật tính năng mới:
              <ul className="list-disc ml-6 mt-2">
                <li>Giao diện tối (Dark Mode) thân thiện với mắt vào ban đêm.</li>
                <li>Thanh toán qua nhiều phương thức khác nhau</li>
                <li>Nhiều tựa game mà các bạn muốn mua</li>
              </ul>
              <br />
              🚀 Hãy bắt đầu trải nghiệm ngay hôm nay. Cảm ơn bạn đã đồng hành cùng KingGameMobile!
            </p>
          </div>
        </div>
      )}
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa inventore iste exercitationem necessitatibus suscipit dolores obcaecati nemo officiis cum. Ipsa corporis aspernatur dolore quidem pariatur tenetur temporibus aperiam inventore praesentium.
      </div>
      <div>
        Sản phẩm bán chạy :
      </div>
      <hr />
      <div className="flex flex-1">
        <div className="box">
          game evil hunter tycoon
        </div>
        <div className="box">
          game sword master story
        </div>
      </div>
    </>
  );
};

export default Home;
