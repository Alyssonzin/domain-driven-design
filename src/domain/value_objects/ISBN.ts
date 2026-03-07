export class ISBN {
  public value: string;

  constructor(value: string) {
    if (!this.isValidIsbn(value)) {
      throw new Error('Invalid ISBN format');
    }
    this.value = value;
  }

  isValidIsbn(isbn: string): boolean {
    //precisa ser de 13 dígitos numéricos
    return isbn.match(/^(?:\d{13})$/) !== null;
  }
}