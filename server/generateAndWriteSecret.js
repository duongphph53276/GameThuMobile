import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const secret = crypto.randomBytes(32).toString('hex'); // Tạo chuỗi ngẫu nhiên 64 ký tự
const envPath = path.resolve('.env'); // Đường dẫn tuyệt đối đến .env

// Đọc nội dung hiện tại của .env (nếu có)
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
    // Nếu .env chưa tồn tại, không sao cả
}

// Kiểm tra xem JWT_SECRET đã tồn tại chưa
const jwtSecretRegex = /^JWT_SECRET=/m;
if (jwtSecretRegex.test(envContent)) {
    // Nếu JWT_SECRET đã tồn tại, thay thế nó
    envContent = envContent.replace(jwtSecretRegex, `JWT_SECRET=${secret}`);
} else {
    // Nếu JWT_SECRET chưa tồn tại, thêm nó vào cuối file
    envContent += `\nJWT_SECRET=${secret}\n`;
}

// Ghi nội dung mới vào .env
fs.writeFileSync(envPath, envContent);

console.log(`.env file updated with JWT_SECRET=${secret}`);