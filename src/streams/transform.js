import { Transform } from "stream";

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, cb) {
      const reversedChunk = chunk.toString().split("").reverse().join("");
      this.push(reversedChunk);
      cb();
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
