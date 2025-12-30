export class Endereco {
  constructor(
    private rua: string,
    private numero: string,
    private bairro: string,
    private complemento: string
  ) {}

  formatar(): string {
    return `${this.rua}, ${this.numero} - ${this.bairro}${
      this.complemento ? `(${this.complemento})` : ""
    }`;
  }
}
