export class FullName {
  public readonly firstName: string;
  public readonly lastName: string;

  constructor(firstName: string, lastName: string) {
    if (!firstName || !lastName) {
      throw new Error("First name and last name are required");
    }
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static fromFullName(fullName: string): FullName {
    const parts = fullName.trim().split(" ");
    if (parts.length < 2) {
      throw new Error("Full name must contain at least a first name and a last name");
    }
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");
    return new FullName(firstName, lastName);
  }
}