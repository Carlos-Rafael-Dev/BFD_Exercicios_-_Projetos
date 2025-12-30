import { useState } from "react";
import { useUsuario } from "../../hooks/useUsuario";
import Button from "../../components/Button";

export default function Login() {
    const { login } = useUsuario();
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    return (
        <section>
            <h2>Identifique-se</h2>
            <p>Assim agilizamos seu pedido 😉</p>

            <input
                placeholder="Seu nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />

            <input 
                placeholder="Telefone (WhatsApp)"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
            />

            <Button onClick={() => login(nome, telefone)}>
                Continuar
            </Button>
        </section>
    );
}

//Zero ficção para o usuario