import { User } from "../../domain/entities/User";
import { UserModel } from "../database/models/UserModel";

export class UserMapper {

  static toDomain(model: UserModel): User {
    return new User(model.id, model.name, model.active_loans);
  }

  static toModel(domain: User): UserModel {
    return {
      id: domain.getId(),
      name: domain.getName(),
      active_loans: domain.getActiveLoans()
    };
  }
}