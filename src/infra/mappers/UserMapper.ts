import { User } from "../../domain/entities/User";
import { CPF } from "../../domain/value_objects/CPF";
import { FullName } from "../../domain/value_objects/FullName";
import { UserModel } from "../database/models/UserModel";

export class UserMapper {

  static toDomain(model: UserModel): User {
    return new User(model.id, FullName.fromFullName(model.name), new CPF(model.cpf), model.active_loans);
  }

  static toModel(domain: User): UserModel {
    return {
      id: domain.getId(),
      name: domain.getName(),
      cpf: domain.getCpf().getValue(),
      active_loans: domain.getActiveLoans()
    };
  }
}