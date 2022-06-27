import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import { ParcelInput } from "../../types";

export const parseCsv = (): ParcelInput[] => {
  const pathToInput = "input.csv";
  const input: ParcelInput[] = parse(readFileSync(pathToInput), {
    columns: ["height", "width", "depth"],
    from_line: 2,
    bom: true,
  });

  return input;
};
