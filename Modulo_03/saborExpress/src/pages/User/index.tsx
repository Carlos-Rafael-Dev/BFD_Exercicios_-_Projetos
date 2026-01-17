import { Pedido } from "../../domain/entities/Pedido";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
import { useUsuario } from "../../hooks/useUsuario";
import Header from "../../components/Header";

// pagina do usuario onde pode ver nome, endereço e historico de pedidos
export default function UsuarioPage() {
  const { usuario, logout, historicoPedidos } = useUsuario();

  if (!usuario) {
    return <p>Usuário não logado.</p>;
  }

  const endereco = usuario.getEndereco();

  return (
    <>
      <Header />
      <h2>{usuario.getNome()}</h2>

      <p>
        <strong>Telefone:</strong> {usuario.getTelefone()}
      </p>

      <div>
        <h3>Endereço</h3>
        {endereco ? (
          <p>{endereco.formatar()}</p>
        ) : (
          <p>Endereço não cadastrado.</p>
        )}
      </div>

      <div>
        <h3>Histórico de pedidos</h3>

        {historicoPedidos.length === 0 ? (
          <p>Nenhum pedido realizado.</p>
        ) : (
          <ul>
            {historicoPedidos.map((pedidoDTO, index) => {
              const pedido = Pedido.fromJSON(pedidoDTO);

              return (
                <li key={index}>
                  <strong>{pedido.listarResumo()}</strong>
                  <br />
                  Total: R$ {pedido.calcularTotal().toFixed(2)}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <NavLink to="/">
        <Button onClick={logout}>Sair</Button>
      </NavLink>
    </>
  );
}