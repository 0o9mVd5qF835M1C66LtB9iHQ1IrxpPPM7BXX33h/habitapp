import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./user.schema";
import { CreateUserInput } from "./user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email.toLowerCase() });
  }

  async createTempUser() {
    return await this.userModel.create({
      // _id: new Types.ObjectId(),
      isTemp: true,
    });
  }

  async setTempUserAsRegistered(
    tempUserId: Types.ObjectId,
    info: { email: string; password?: string },
  ) {
    return await this.userModel.findOneAndUpdate(
      { _id: tempUserId },
      {
        email: info.email,
        password: info.password,
        isTemp: false,
      },
      {
        new: true,
      },
    );
  }
}
