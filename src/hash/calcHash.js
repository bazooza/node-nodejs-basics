import { readFile } from "node:fs/promises";
import { createHash } from "crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");
  const fileContent = await readFile(filePath);

  const hash = createHash("sha256");

  hash.update(fileContent);
  const hashHex = hash.digest("hex");
  console.log(hashHex);
};

await calculateHash();
