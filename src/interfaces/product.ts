import { GameName } from './gamename';

export interface Product {
  _id: string;
  gameName: GameName | string; // Hỗ trợ cả object GameName hoặc _id string
  accountType: 'email' | 'facebook';
  accountEmail?: string;
  accountFacebookId?: string;
  password: string;
  twoFactorCode?: string | null;
  recoveryEmail?: string | null;
  images: string[];
  createdAt: string;
  status: 'Còn Hàng' | 'Hết Hàng';
  price: number;
  description: string;
}