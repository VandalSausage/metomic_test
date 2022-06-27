export interface ParcelInput {
  height: number;
  width: number;
  depth: number;
  weight: number;
}

export type ParcelType = "small" | "medium" | "large" | "xl" | "heavy parcel";
export interface ParcelOutput {
  cost: number;
  name: string;
  type: ParcelType;
}

export interface Output {
  totalCost: number;
  parcels: ParcelOutput[];
}
export interface Config {
  isSpeedy: boolean;
}
