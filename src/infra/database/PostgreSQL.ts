import { Pool, PoolClient, PoolConfig, QueryResult, QueryResultRow } from "pg";
import { ENV } from "../../server";

export class PostgreSQL {
  private readonly pool: Pool;

  constructor(config?: PoolConfig) {
    this.pool = new Pool(config ?? this.getDefaultConfig());
  }

  private getDefaultConfig(): PoolConfig {
    return {
      host: ENV.PG_HOST,
      port: 5432,
      user: ENV.PG_USER,
      password: ENV.PG_PASSWORD,
      database: ENV.PG_DATABASE,
    };
  }

  async connect(): Promise<void> {
    const client = await this.pool.connect();
    client.release();
  }

  async query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params: unknown[] = []
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(text, params);
  }

  async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}