export class CPF {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid CPF');
    }
    this.value = value;
  }

  validate(cpf: string): boolean {
    return /^\d{11}$/.test(cpf);
  }

  getValue(): string {
    return this.value;
  }
}