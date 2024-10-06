import { access, constants, rename as changeName } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const sourceFile = join(__dirname, "files", "wrongFilename.txt");
  const targetFile = join(__dirname, "files", "properFilename.md");

  try {
    await access(sourceFile, constants.F_OK).catch(() => {
      throw new Error("FS operation failed");
    });
    await access(targetFile, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await changeName(sourceFile, targetFile);
      console.log("File renamed successfully");
    } else {
      throw new Error(error.message);
    }
  }
};

await rename();
