import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserModel } from "../database/models/UserModel";
import { SQLite } from "../database/SQLite";
import { UserMapper } from "../mappers/UserMapper";

export class SQLiteUserRepository implements UserRepository {
  private database: SQLite;
  private readonly tableName = "users";

  constructor() {
    this.database = new SQLite();
  }

  async findById(id: string): Promise<User | null> {
    const userModel = await this.database.getItemById<UserModel>(this.tableName, id);
    if (!userModel) {
      return null;
    }
    return UserMapper.toDomain(userModel);
  }

  async save(user: User): Promise<void> {
    const model = UserMapper.toModel(user);
    await this.database.saveItem(this.tableName, model);
  }
}