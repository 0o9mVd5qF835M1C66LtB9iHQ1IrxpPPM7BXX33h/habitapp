import { PassportStrategy } from "@nestjs/passport";
import {
  Strategy,
  VerifyCallback,
  StrategyOptionsWithRequest,
} from "passport-google-oauth20";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User, UserDocument } from "../user/user.schema";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(<StrategyOptionsWithRequest>{
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google-redirect",
      scope: ["email"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: VerifyCallback,
  ): Promise<any> {
    const { emails } = profile;
    const user = {
      email: emails[0].value,
    };
    cb(null, user);
  }
}
