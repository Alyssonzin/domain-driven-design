import { CPF } from "../value_objects/CPF";
import { FullName } from "../value_objects/FullName";

export class User {
  private id: string;
  private name: FullName;
  private cpf: CPF;
  private activeLoans: number;
  private readonly MAX_ACTIVE_LOANS = 3;

  constructor(id: string, name: FullName, cpf: CPF, activeLoans = 0) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.activeLoans = activeLoans;
  }

  getId(): string {
    return this.id;
  }

  getCpf(): CPF {
    return this.cpf;
  }

  getName(): string {
    return this.name.getFullName();
  }

  getActiveLoans(): number {
    return this.activeLoans;
  }

  canBorrow(): boolean {
    return this.activeLoans < this.MAX_ACTIVE_LOANS;
  }

  borrowBook(): void {
    if (!this.canBorrow()) {
      throw new Error('User has reached the maximum number of active loans');
    }
    this.activeLoans++;
  }

  returnBook(): void {
    if (this.activeLoans > 0) {
      this.activeLoans--;
    }
  }
}