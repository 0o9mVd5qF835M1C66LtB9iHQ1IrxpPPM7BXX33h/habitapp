import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User, UserDocument } from "../user/user.schema";

type JwtPayload = {
  userId: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const userDocument = await this.userModel.findById(
      new Types.ObjectId(payload.userId),
    );

    if (!userDocument) {
      throw new UnauthorizedException();
    }

    const { password, ...user } = userDocument.toObject();

    return user;
  }
}
