import { createObjectCsvWriter } from "csv-writer";
import { ObjectCsvWriterParams } from "csv-writer/src/lib/csv-writer-factory";
import { Config, Output } from "../../types";

const writerConfig: ObjectCsvWriterParams = {
  path: "output.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "cost", title: "Cost (£)" },
    { id: "type", title: "Parcel Type" },
  ],
};

// spoof the types a little to all for a summary row
const getCostSummary = (totalCost: number, isSpeedy: boolean) => {
  const emptyLine = {
    cost: "",
    name: "",
    type: "",
  };
  return isSpeedy
    ? [
        emptyLine,
        {
          cost: `£${totalCost}`,
          name: "Delivery Cost:    ",
          type: "",
        },
        {
          cost: `£${totalCost}`,
          name: "Additional Speedy Delivery Cost:    ",
          type: "",
        },
        {
          cost: `£${totalCost * 2}`,
          name: "Total Cost:    ",
          type: "",
        },
      ]
    : [
        emptyLine,
        {
          cost: `£${totalCost}`,
          name: "Total Cost:    ",
          type: "",
        },
      ];
};

export const writeOutput = async (
  { parcels, totalCost }: Output,
  { isSpeedy }: Config
): Promise<void> => {
  console.log(parcels);
  console.log({ totalCost });
  console.log({ isSpeedy, additionalCost: isSpeedy ? totalCost : 0 });
  const csvWriter = createObjectCsvWriter(writerConfig);
  // add the parcels to the csv
  await csvWriter.writeRecords(parcels);
  // add the summary
  await csvWriter.writeRecords(getCostSummary(totalCost, isSpeedy));
};
