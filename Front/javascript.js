class Pessoa {
    constructor(nome) {
        this.nome = nome;
    }
}

const nomes = [];

document.body.innerHTML = `
    <button id="adicionar">Adicionar Nome</button>
    <ul id="listaNomes"></ul>
`;

document.getElementById('adicionar').addEventListener('click', () => {
    const nome = prompt("Digite o nome:");
    if (nome) {
        const pessoa = new Pessoa(nome);
        nomes.push(pessoa.nome);

        const lista = document.getElementById('listaNomes');
        const item = document.createElement('li');
        item.textContent = pessoa.nome;
        lista.appendChild(item);
    }
});