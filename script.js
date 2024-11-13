document.getElementById('status').addEventListener('change', function() {
    const installmentsContainer = document.getElementById('installments-container');
    if (this.value === 'A Prazo') {
        installmentsContainer.classList.remove('hidden');
        document.getElementById('installments').required = true;
    } else {
        installmentsContainer.classList.add('hidden');
        document.getElementById('installments').required = false;
    }
});

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;
    const installments = document.getElementById('installments').value || '-';

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="border px-4 py-2">${description}</td>
        <td class="border px-4 py-2">R$ ${amount}</td>
        <td class="border px-4 py-2">${date}</td>
        <td class="border px-4 py-2">${status}</td>
        <td class="border px-4 py-2">${installments}</td>
        <td class="border px-4 py-2">
            <button class="text-blue-600 hover:underline mr-2 edit-btn"><i class="fas fa-edit"></i> Editar</button>
            <button class="text-red-600 hover:underline delete-btn"><i class="fas fa-trash"></i> Excluir</button>
        </td>
    `;
    document.getElementById('expense-list').appendChild(newRow);

    document.getElementById('expense-form').reset();
    document.getElementById('installments-container').classList.add('hidden');

    addEventListeners();
});

function addEventListeners() {
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const description = row.children[0].textContent;
            const amount = row.children[1].textContent.replace('R$ ', '');
            const date = row.children[2].textContent;
            const status = row.children[3].textContent;
            const installments = row.children[4].textContent;

            document.getElementById('description').value = description;
            document.getElementById('amount').value = amount;
            document.getElementById('date').value = date;
            document.getElementById('status').value = status;

            if (status === 'A Prazo') {
                document.getElementById('installments-container').classList.remove('hidden');
                document.getElementById('installments').value = installments;
            } else {
                document.getElementById('installments-container').classList.add('hidden');
            }

            row.remove();
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('tr').remove();
        });
    });
}
