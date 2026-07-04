import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE = path.join(
    __dirname,
    "../src/data/cameraKeyframes.json"
);

function readFrames() {
    if (!fs.existsSync(FILE)) return [];

    return JSON.parse(
        fs.readFileSync(FILE, "utf8")
    );
}

function writeFrames(frames) {
    fs.writeFileSync(
        FILE,
        JSON.stringify(frames, null, 4)
    );
}

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    // SAVE
    if (req.url === "/save-keyframe" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {

            const frame = JSON.parse(body);

            const frames = readFrames();

            const index = frames.findIndex(
                f => Math.abs(f.progress - frame.progress) < 0.0005
            );

            if (index !== -1) {
                frames[index] = frame;
                console.log(`✏ Updated ${frame.progress}`);
            } else {
                frames.push(frame);
                frames.sort((a, b) => a.progress - b.progress);
                console.log(`✔ Saved ${frame.progress}`);
            }

            writeFrames(frames);

            res.writeHead(200);
            res.end("ok");

        });

        return;
    }

    // DELETE LAST
    if (req.url === "/delete-last" && req.method === "DELETE") {

        const frames = readFrames();

        frames.pop();

        writeFrames(frames);

        console.log("🗑 Deleted last");

        res.writeHead(200);
        return res.end("ok");
    }

    // GET
    if (req.url === "/keyframes" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(
            JSON.stringify(readFrames())
        );
    }

    res.writeHead(404);
    res.end();

});

server.listen(3001, () => {
    console.log("🎥 Recorder running on port 3001");
});