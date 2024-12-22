const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Phân tích URL để lấy tham số từ query string
    const parsedUrl = url.parse(req.url, true);
    const { name, title } = parsedUrl.query;

    // Kiểm tra nếu có đủ thông tin từ query string
    if (name && title) {
        // Tạo chuỗi chào mừng
        const greeting = `Hello ${title} ${name}`;

        // Thiết lập header cho phản hồi
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        // Gửi chuỗi chào mừng làm nội dung phản hồi
        res.end(greeting);
    } else {
        // Nếu thiếu thông tin, trả về phản hồi lỗi
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing name or title in the query string');
    }
});

const PORT = 8081;

// Lắng nghe trên cổng 8081
server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});