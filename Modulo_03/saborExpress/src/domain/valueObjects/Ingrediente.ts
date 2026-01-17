export class Ingrediente {
  constructor(
    public id: string,
    public nome: string,
    public quantidade: string,
    public kcal: number,
    public imagem: string,
    public obrigatorio: boolean,
    public selecionado: boolean
  ) {}

  alternarSelecao() {
    if (this.obrigatorio) return;
    this.selecionado = !this.selecionado;
  }

  clonar(): Ingrediente {
    return new Ingrediente(
      this.id,
      this.nome,
      this.quantidade,
      this.kcal,
      this.imagem,
      this.obrigatorio,
      this.selecionado
    );
  }
}
