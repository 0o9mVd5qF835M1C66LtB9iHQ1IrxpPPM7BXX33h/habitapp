import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        let uri = process.env.DATABASE_URI;

        if (process.env.NODE_ENV === "test") {
          uri = await DatabaseModule.getTestMongoDBURI();
        }

        return {
          uri,
        };
      },
    }),
  ],
})
export class DatabaseModule {
  static testMongoDB: MongoMemoryServer;

  constructor() {
    if (!process.env.DATABASE_URI && process.env.NODE_ENV !== "test") {
      throw new Error(`Missing DATABASE_URI in env`);
    }
  }

  static async getTestMongoDBURI() {
    if (!DatabaseModule.testMongoDB) {
      DatabaseModule.testMongoDB = await MongoMemoryServer.create();
    }

    return DatabaseModule.testMongoDB.getUri();
  }

  static async dropTestMongoDB() {
    for (const connection of mongoose.connections) {
      const isMongooseConnected = connection.readyState == 1;
      if (DatabaseModule.testMongoDB && isMongooseConnected) {
        await connection.dropDatabase();
      }
    }
  }

  static async stopTestMongoDB() {
    if (DatabaseModule.testMongoDB) {
      await mongoose.disconnect();
      await DatabaseModule.testMongoDB.stop();
    }
  }
}
