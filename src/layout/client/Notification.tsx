import React from 'react';
import './marquee.css'; // Import file CSS cho hiệu ứng cuộn

const Notification: React.FC = () => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-700 p-0.1 shadow-md notification-container border"> {/* Thay đổi padding để giảm chiều cao */}
      <ul className="flex space-x-6 justify-center">
        <li className="marquee">
          <span>Admin Hôm Nay Đẹp Trai</span>
        </li>
        {/* Thêm các link khác sau này nếu cần */}
      </ul>
    </nav>
  );
};

export default Notification;