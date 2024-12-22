const http = require('http');
const url = require('url');

const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
};

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const { name, year } = parsedUrl.query;
    if (name && year) {
        // parseInt(year, 10): Đây là một cách để chuyển đổi chuỗi year thành một số nguyên hàm
        const age = calculateAge(parseInt(year, 10));
        const info = `${name} is ${age} year olds`;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(info);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing name or year in the query string');
    }
});

const PORT = 8081;

// Lắng nghe trên cổng 8081
server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});