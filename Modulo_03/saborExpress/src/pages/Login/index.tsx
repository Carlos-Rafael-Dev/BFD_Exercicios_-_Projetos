import { useState } from "react";
import { useUsuario } from "../../hooks/useUsuario";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useUsuario();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    
    function handleContinuar() {
        login(nome, telefone);

        navigate("/checkout");
    }

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

            <Button onClick={handleContinuar}> 
                Continuar
            </Button>

        </section>
    );
}

//Zero ficção para o usuario