const http = require('http');
const url = require('url');
const { readNote, writeNote } = require('./utils/fileHandle');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    if (pathName === '/write' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();

        });
        req.on('end', () => {
            const { note } = JSON.parse(body);
            try {
                if (note.trim() === "") {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end("Note cannot be empty");
                }

                writeNote(note);
                res.writeHead(200, { "Content-Type": 'text/plain' });
                return res.end("Note Saved");
            }

            catch (err) {
                res.writeHead(400, { "Content-Type": 'text/plain' });
                return res.end("Invalid Data");
            }



        })

    }

    else if (pathName === "/read" && req.method === 'GET') {
        const readNotes = readNote();
        res.writeHead(200, { "Content-Type": 'text/plain' });
        return res.end(readNotes || "Notes Fetched");
    }

    else {
        res.writeHead(404, { "Content-Type": 'text/plain' });
        return res.end("URL NOT FOUND");
    }
})

server.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
})
