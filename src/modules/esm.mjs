import path from "path";
import { release, version } from "os";
import { createServer } from "http";
import "./files/c.js";
import { readFile } from "fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const random = Math.random();

let unknownObject;

const loadJsonFile = async (filePath) => {
  const jsonData = await readFile(join(__dirname, filePath), "utf-8");
  return JSON.parse(jsonData);
};

if (random > 0.5) {
  unknownObject = loadJsonFile("./files/a.json");
} else {
  unknownObject = loadJsonFile("./files/b.json");
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServer((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
