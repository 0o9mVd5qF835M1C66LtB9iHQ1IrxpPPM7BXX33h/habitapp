import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./user.schema";
import { CreateUserInput } from "./user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email.toLowerCase() });
  }

  async createUser(createUserInput: CreateUserInput) {
    return await this.userModel.create(
      {
        isTemp: false,
        dateCreated: Number(new Date()),
        ...createUserInput,
      },
      (err) => console.log(err), // TODO Send proper error when unique
    );
  }

  async createTempUser() {
    return await this.userModel.create({ isTemp: true });
  }
}
