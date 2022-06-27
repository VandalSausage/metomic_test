import { ParcelType, ParcelInput, Output, ParcelOutput } from "../types";

const weightLookup: Record<ParcelType, number> = {
  small: 1,
  medium: 3,
  large: 6,
  xl: 10,
};

const getWeightCost = (weight: number, type: ParcelType) =>
  Math.max(0, weight - weightLookup[type]) * 2;

const getBaseCost = (
  maxDimension: number
): { cost: number; type: ParcelType } => {
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
const getCost = (
  maxDimension: number,
  weight: number
): { cost: number; type: ParcelType } => {
  const { cost: baseCost, type } = getBaseCost(maxDimension);
  const weightCost = getWeightCost(weight, type);
  return { cost: baseCost + weightCost, type };
};

const getParcel = (
  { height, width, depth, weight }: ParcelInput,
  index: number
): ParcelOutput => ({
  name: `Parcel ${index + 1}`,
  ...getCost(Math.max(height, width, depth), weight),
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
