import { Worker } from "worker_threads";
import os from "os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWorker = (iteration) => {
  const workerPath = join(__dirname, "./worker.js");
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { iterations: iteration },
    });

    worker.on("message", (result) => {
      resolve({ status: "resolved", data: result });
    });

    worker.on("error", (error) => {
      resolve({ status: "error", data: null });
    });
  });
};

const performCalculations = async () => {
  const cpuCores = os.cpus().length;
  const workerPromises = [];

  for (let i = 0; i < cpuCores; i++) {
    const iteration = 10 + i;
    const workerPromise = createWorker(iteration);
    workerPromises.push(workerPromise);
  }

  const results = await Promise.all(workerPromises);
  console.log(results);
};

performCalculations();
