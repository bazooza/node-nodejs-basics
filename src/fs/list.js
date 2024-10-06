import { access, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const directoryPath = join(__dirname, "files");
  try {
    await access(directoryPath);
    const files = await readdir(directoryPath);
    console.log(files);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await list();
