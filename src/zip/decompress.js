import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputFilePath = join(__dirname, "files", "archive.gz");
  const outputFilePath = join(__dirname, "files", "fileToCompress.txt");

  const readStream = createReadStream(inputFilePath);
  const writeStream = createWriteStream(outputFilePath);
  const gunzipStream = createGunzip();

  const decompressedStream = readStream.pipe(gunzipStream).pipe(writeStream);

  return new Promise((resolve, reject) => {
    decompressedStream.on("finish", () => {
      console.log("File decompressed successfully");
      resolve();
    });

    decompressedStream.on("error", (error) => {
      console.error("Error decompressing file:", error);
      reject(error);
    });
  });
};

await decompress();
