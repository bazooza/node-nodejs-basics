import { stat, copyFile, readdir, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourceDir = join(__dirname, "files");
  const targetDir = join(__dirname, "files_copy");

  try {
    const sourceDirExists = await stat(sourceDir).catch(() => false);
    if (!sourceDirExists || !sourceDirExists.isDirectory()) {
      throw new Error("FS operation failed");
    }

    const targetDirExists = await stat(targetDir).catch(() => false);
    if (targetDirExists && targetDirExists.isDirectory()) {
      throw new Error("FS operation failed");
    }

    await mkdir(targetDir);

    const files = await readdir(sourceDir);

    for (const file of files) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);

      await copyFile(sourcePath, targetPath);
    }

    console.log("Folder copied successfully");
  } catch (error) {
    throw new Error(error.message);
  }
};

await copy();
