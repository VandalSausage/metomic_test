import { readFileSync } from "fs";
import { calculateOutput } from "./calc-output";
import { parseCsv, writeOutput } from "./csv";
import { Config } from "./types";

const getConfig = (): Config => {
  try {
    const config = JSON.parse(
      readFileSync("config.json", { encoding: "utf-8" })
    );
    return { isSpeedy: !!config.isSpeedy };
  } catch (e) {
    console.error(e);
    console.log("could not parse params - choosing defaults");
    return { isSpeedy: false };
  }
};

const main = async () => {
  const config = getConfig();
  const input = parseCsv();
  const output = calculateOutput(input);
  await writeOutput(output, config);
};

main();
