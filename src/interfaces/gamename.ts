export interface GameName {
    _id: string;
    name: string; // Tên game
    slug: string; // Slug của game (ví dụ: "game-a")
    createdAt?: string; // Ngày tạo (tùy chọn)
  }