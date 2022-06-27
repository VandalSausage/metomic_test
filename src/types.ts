export interface ParcelInput {
  height: number;
  width: number;
  depth: number;
}

export type ParcelType = "small" | "medium" | "large" | "xl";
export interface ParcelOutput {
  cost: number;
  name: string;
  type: ParcelType;
}

export interface Output {
  totalCost: number;
  parcels: ParcelOutput[];
}
