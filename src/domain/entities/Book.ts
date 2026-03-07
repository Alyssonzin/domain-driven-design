import { ISBN } from "../value_objects/ISBN";

export class Book {
  private id: string;
  private title: string;
  private isbn: ISBN;

  constructor(id: string, title: string, isbn: ISBN) {
    this.id = id;
    this.title = title;
    this.isbn = isbn;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getIsbn(): ISBN {
    return this.isbn;
  }
}