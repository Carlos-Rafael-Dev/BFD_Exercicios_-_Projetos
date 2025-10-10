// script.js - comportamento de reservas
document.addEventListener('DOMContentLoaded', function () {
    const prices = {
        'executivo': 350,
        'suite-master': 550,
        'standard': 200
    };

    // Abrir formulário e selecionar o quarto quando clicar em "Reservar Agora"
    document.querySelectorAll('.reserve-now').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const room = e.currentTarget.dataset.room;
            document.getElementById('room').value = room;
            // scroll até a seção de reserva e focar no check-in
            const section = document.getElementById('reservation-section');
            section.scrollIntoView({behavior: 'smooth'});
            document.getElementById('check-in').focus();
        });
    });

    // Validação + cálculo do preço ao submeter formulário
    document.getElementById('reservation-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const checkInEl = document.getElementById('check-in');
        const checkOutEl = document.getElementById('check-out');
        const roomEl = document.getElementById('room');

        const checkIn = new Date(checkInEl.value);
        const checkOut = new Date(checkOutEl.value);
        const room = roomEl.value;

        // Validações básicas
        if (!checkInEl.value || !checkOutEl.value || !room) {
            alert('Por favor preencha todas as informações da reserva.');
            return;
        }
        if (isNaN(checkIn) || isNaN(checkOut)) {
            alert('Datas inválidas.');
            return;
        }
        if (checkOut <= checkIn) {
            alert('A data de check-out deve ser posterior à data de check-in.');
            return;
        }

        // Cálculo de noites
        const msPerDay = 1000 * 60 * 60 * 24;
        // diferença em ms -> converter para dias
        const nights = Math.round((checkOut - checkIn) / msPerDay);
        const pricePerNight = prices[room] || 0;
        const total = nights * pricePerNight;

        // Mostrar modal de confirmação
        const modal = document.getElementById('confirm-modal');
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <p><strong>Quarto:</strong> ${room.replace('-', ' ')}</p>
            <p><strong>Check-in:</strong> ${checkInEl.value}</p>
            <p><strong>Check-out:</strong> ${checkOutEl.value}</p>
            <p><strong>Noites:</strong> ${nights}</p>
            <p><strong>Preço por noite:</strong> R$ ${pricePerNight.toFixed(2)}</p>
            <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
            <p>Reserva realizada com sucesso! (simulação)</p>
        `;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden','false');

        // Opcional: aqui você poderia enviar os dados para um servidor via fetch()
    });

    document.getElementById('modal-close').addEventListener('click', function () {
        const modal = document.getElementById('confirm-modal');
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden','true');
    });
});