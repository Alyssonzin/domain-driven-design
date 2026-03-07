export class User {
  private id: string;
  private name: string;
  private activeLoans: number;
  private readonly MAX_ACTIVE_LOANS = 3;

  constructor(id: string, name: string, activeLoans = 0) {
    this.id = id;
    this.name = name;
    this.activeLoans = activeLoans;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
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