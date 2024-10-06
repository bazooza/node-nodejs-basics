import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");
  try {
    const readableStream = createReadStream(filePath, { encoding: "utf8" });

    readableStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    await new Promise((resolve, reject) => {
      readableStream.on("end", resolve);
      readableStream.on("error", reject);
    });
  } catch (error) {
    throw new Error(
      "Reading of stream hasn't been completed due to an error",
      error
    );
  }
};

await read();
