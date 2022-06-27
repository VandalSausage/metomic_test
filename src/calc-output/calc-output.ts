import { ParcelType, ParcelInput, Output, ParcelOutput } from "../types";

const getCost = (maxDimension: number): { cost: number; type: ParcelType } => {
  switch (true) {
    case maxDimension < 10:
      return { cost: 3, type: "small" };
    case maxDimension < 50:
      return { cost: 8, type: "medium" };
    case maxDimension < 100:
      return { cost: 15, type: "large" };
    default:
      return { cost: 25, type: "xl" };
  }
};
const getParcel = (
  { height, width, depth }: ParcelInput,
  index: number
): ParcelOutput => ({
  name: `Parcel ${index + 1}`,
  ...getCost(Math.max(height, width, depth)),
});

export const calculateOutput = (records: ParcelInput[]): Output =>
  records.reduce<Output>(
    (acc, record, i) => {
      const parcel = getParcel(record, i);
      acc.totalCost += parcel.cost;
      acc.parcels.push(parcel);
      return acc;
    },
    { totalCost: 0, parcels: [] } as Output
  );
