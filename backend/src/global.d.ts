import { Schema } from "mongoose";

declare global {
  type ObjectId = Schema.Types.ObjectId;
}

export {};
