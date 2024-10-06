import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const create = async () => {
  try {
    const filePath = path.join(__dirname, "files", "fresh.txt");
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(
        path.join(__dirname, "files", "fresh.txt"),
        "I am fresh and young"
      );
      console.log("File created successfully");
    } else {
      throw error;
    }
  }
};

await create();
