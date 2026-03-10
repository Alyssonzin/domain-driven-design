import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserModel } from "../database/models/UserModel";
import { PostgreSQL } from "../database/PostgreSQL";
import { UserMapper } from "../mappers/UserMapper";

export class PgUserRepository implements UserRepository {
  private readonly database: PostgreSQL;
  private readonly tableName = "users";

  constructor() {
    this.database = new PostgreSQL();
  }

  async findById(id: string): Promise<User | null> {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const userResponse = await this.database.query<UserModel>(sql, [id]);
    const user = userResponse.rows[0];
    if (!user) {
      return null;
    }
    return UserMapper.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const model = UserMapper.toModel(user);
    const sql = `INSERT INTO ${this.tableName} (id, name, cpf, active_loans) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, cpf = EXCLUDED.cpf, active_loans = EXCLUDED.active_loans`;
    await this.database.query(sql, [model.id, model.name, model.cpf, model.active_loans]);
  }
}