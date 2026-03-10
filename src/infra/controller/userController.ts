import { Request, Response } from "express";
import { CreateUserSchema } from "../schemas/createUserSchema";
import { User } from "../../domain/entities/User";
import { CPF } from "../../domain/value_objects/CPF";
import { FullName } from "../../domain/value_objects/FullName";
import { PgUserRepository } from "../repositories/PgUserRepository";
import { FindByIdSchema } from "../schemas/findByIdSchema";
import { UserMapper } from "../mappers/UserMapper";

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    const { body } = CreateUserSchema.parse(req);

    const cpf = new CPF(body.cpf);
    const fullname = new FullName(body.name, body.surname);
    const user = new User(crypto.randomUUID(), fullname, cpf);
    const userRepository = new PgUserRepository();
    await userRepository.save(user);

    res.status(201).json({ id: user.getId() });
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { params } = FindByIdSchema.parse(req);

    const userRepository = new PgUserRepository();
    const user = await userRepository.findById(params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const userResponse = UserMapper.toModel(user);
    res.status(200).json(userResponse);
  }
}

export default new UserController();