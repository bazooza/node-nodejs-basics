import { access, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const fileToRemove = join(__dirname, "files", "fileToRemove.txt");
  try {
    await access(fileToRemove);
    await unlink(fileToRemove);
    console.log("File removed successfully");
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw new Error("FS operation failed");
    }
  }
};

await remove();
