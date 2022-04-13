import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(email: string) {
    return await this.userModel.findOne({ email: email.toLowerCase() });
  }
}
