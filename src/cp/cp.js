import { spawn } from "child_process";
import { stdin, stdout } from "process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const pathToScript = join(__dirname, "files", "script.js");
  const childProcess = spawn("node", [pathToScript, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(stdout);

  await new Promise((resolve, reject) => {
    childProcess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });
  });
};

spawnChildProcess(["someArgument1", "someArgument2"]);
