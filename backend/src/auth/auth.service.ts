import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.schema";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string): Promise<User | null> {
    const user = await this.userService.find(email);

    return user;
  }
}
