import { Database } from "sqlite3";
import path from "path";

export class SQLite {
  private connection: Database;

  constructor() {
    const dbPath = path.resolve(__dirname, "../../database.sqlite");

    this.connection = new Database(dbPath, (err) => {
      if (err) {
        console.error("Erro ao conectar no SQLite:", err.message);
      } else {
        console.log("SQLite conectado.");
      }
    });
  }

  private escapeIdentifier(identifier: string): string {
    return identifier.replace(/"/g, '""');
  }

  private getTableColumns(tableName: string): Promise<Set<string>> {
    const escapedTableName = this.escapeIdentifier(tableName);
    const sql = `PRAGMA table_info("${escapedTableName}")`;

    return new Promise((resolve, reject) => {
      this.connection.all(sql, [], (err, rows: Array<{ name: string }>) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(new Set(rows.map((row) => row.name)));
      });
    });
  }

  private tableExists(tableName: string): Promise<boolean> {
    const sql = "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1";

    return new Promise((resolve, reject) => {
      this.connection.get(sql, [tableName], (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(Boolean(row));
      });
    });
  }

  private async assertSafeTableAndColumns(tableName: string, columns: string[]): Promise<void> {
    const exists = await this.tableExists(tableName);
    if (!exists) {
      throw new Error(`Tabela invalida ou inexistente: ${tableName}`);
    }

    const validColumns = await this.getTableColumns(tableName);
    for (const column of columns) {
      if (!validColumns.has(column)) {
        throw new Error(`Coluna invalida para tabela ${tableName}: ${column}`);
      }
    }
  }

  public async saveItem(tableName: string, data: Record<string, any>): Promise<void> {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      throw new Error("Nao e permitido salvar sem colunas.");
    }

    const columnNames = entries.map(([column]) => column);
    await this.assertSafeTableAndColumns(tableName, columnNames);

    const escapedTableName = this.escapeIdentifier(tableName);
    const columns = columnNames.map((column) => `"${this.escapeIdentifier(column)}"`);
    const placeholders = entries.map(() => "?").join(", ");
    const values = entries.map(([, value]) => value);

    const sql = `INSERT INTO "${escapedTableName}" (${columns.join(", ")}) VALUES (${placeholders})`;

    await new Promise<void>((resolve, reject) => {
      this.connection.run(sql, values, function (err) {
        if (err) {
          console.error(`Erro ao salvar item na tabela ${tableName}:`, err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async deleteItem(tableName: string, id: string): Promise<void> {
    await this.assertSafeTableAndColumns(tableName, ["id"]);
    const escapedTableName = this.escapeIdentifier(tableName);
    const sql = `DELETE FROM "${escapedTableName}" WHERE id = ?`;

    await new Promise<void>((resolve, reject) => {
      this.connection.run(sql, [id], function (err) {
        if (err) {
          console.error(`Erro ao excluir item da tabela ${tableName}:`, err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async getItemById<T>(tableName: string, id: string): Promise<T | null> {
    await this.assertSafeTableAndColumns(tableName, ["id"]);
    const escapedTableName = this.escapeIdentifier(tableName);
    const sql = `SELECT * FROM "${escapedTableName}" WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.connection.get<T>(sql, [id], (err, row) => {
        if (err) {
          console.error(`Erro ao buscar item na tabela ${tableName}:`, err.message);
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    });
  }
}