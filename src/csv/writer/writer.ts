import { createObjectCsvWriter } from "csv-writer";
import { ObjectCsvWriterParams } from "csv-writer/src/lib/csv-writer-factory";
import { Output } from "../../types";

const writerConfig: ObjectCsvWriterParams = {
  path: "output.csv",
  header: [
    { id: "name", title: "Name" },
    { id: "cost", title: "Cost (£)" },
    { id: "type", title: "Parcel Type" },
  ],
};

// spoof the types a little to all for a summary row
const getCostSummary = (totalCost: number) => [
  // add an empty line
  {
    cost: "",
    name: "",
    type: "",
  },
  {
    cost: `£${totalCost}`,
    name: "Total Cost:    ",
    type: "",
  },
];

export const writeOutput = async ({
  parcels,
  totalCost,
}: Output): Promise<void> => {
  console.log(parcels);
  console.log({ totalCost });
  const csvWriter = createObjectCsvWriter(writerConfig);
  // add the parcels to the csv
  await csvWriter.writeRecords(parcels);
  // add the summary
  await csvWriter.writeRecords(getCostSummary(totalCost));
};
