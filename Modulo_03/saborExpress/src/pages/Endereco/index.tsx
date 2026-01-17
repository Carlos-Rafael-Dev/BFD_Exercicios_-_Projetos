import { useState } from "react";
import { Endereco } from "../../domain/valueObjects/Endereco";
import { useUsuario } from "../../hooks/useUsuario";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";

export default function EnderecoPage() {
  const { definirEndereco } = useUsuario();

  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");

  function salvar() {
    definirEndereco(new Endereco(rua, numero, bairro, complemento));
  }

  return (
    <section>
      <h2>Endereço de entrega</h2>

      <input placeholder="Rua" onChange={(e) => setRua(e.target.value)} />
      <input placeholder="Número" onChange={(e) => setNumero(e.target.value)} />
      <input placeholder="Bairro" onChange={(e) => setBairro(e.target.value)} />
      <input
        placeholder="Complemento"
        onChange={(e) => setComplemento(e.target.value)}
      />
      <NavLink to={"/checkout"}>
      <Button onClick={salvar}>Salvar endereço</Button>
      </NavLink>
    </section>
  );
}
