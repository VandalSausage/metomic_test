import { calculateOutput } from "./calc-output";
import { parseCsv, writeOutput } from "./csv";

const main = async () => {
  const input = parseCsv();
  const output = calculateOutput(input);
  await writeOutput(output);
};

main();
