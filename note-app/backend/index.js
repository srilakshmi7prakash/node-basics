res.setHeader('Access-Control-Allow-Origin', '*');

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');


const file_path = path.join(__dirname, 'note.txt');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathName = parsedUrl.pathname;
    if (pathName === '/read' && req.method === 'GET') {
        if (!fs.existsSync(file_path)) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end("File does not exist");
        }
        const notes = fs.readFileSync(file_path, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end(notes);
    } else if (pathName === '/write' && req.method === 'POST') {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        }
        )
        req.on("end", () => {

            try {
                const { note } = JSON.parse(body)
                if (!note || note.trim() == + "") {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    return res.end("Input Cannot be empty");
                }

                fs.appendFileSync(file_path, note + '\n');
                res.writeHead(201, { "Content-Type": "text/plain" })
                return res.end("Note saved");
            }

            catch (err) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                return res.end("Invalid data");
            }
        })

    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("URL NOT FOUND");
    }
})


server.listen(3000, () => {
    console.log("Server running at 3000")
})