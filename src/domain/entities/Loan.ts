export class Loan {
  private id: string;
  private userId: string;
  private bookId: string;
  private dueDate: Date;
  private returned: boolean;

  constructor(id: string, userId: string, bookId: string, dueDate: Date, returned = false) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
    this.dueDate = dueDate;
    this.returned = returned;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getBookId(): string {
    return this.bookId;
  }

  getDueDate(): Date {
    return this.dueDate;
  }

  alreadyReturned(): boolean {
    return this.returned;
  }
}