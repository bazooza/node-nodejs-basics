import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = join(__dirname, "files", "fileToWrite.txt");
  const fileStream = createWriteStream(filePath);

  process.stdin.on("data", (chunk) => {
    fileStream.write(chunk);
  });
  // Ctrl + D (Unix/Linux) or Ctr + Z (Windows) for this to trigger from a terminal.
  process.stdin.on("end", () => {
    fileStream.end();
    console.log("Data written to file successfully.");
  });
};

await write();
