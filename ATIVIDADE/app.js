const alunosList = document.querySelector("#students-list");
const form = document.querySelector("#add-student-form");

function renderStudent(doc) {
    let li = document.createElement("li");
    let nome = document.createElement("span");
    let cpf = document.createElement("span");
    let rg = document.createElement("span");
    let telefone_aluno = document.createElement("span");
    let telefone_responsavel = document.createElement("span");
    let email = document.createElement("span");
    let data_nascimento = document.createElement("span");
    let excluir = document.createElement("button");

    excluir.textContent = "X";
    excluir.classList.add("excluir-btn");

    li.setAttribute("data-id", doc.id);
    nome.textContent = `Nome: ${doc.data().nome}`;
    cpf.textContent = `CPF: ${doc.data().cpf}`;
    rg.textContent = `RG: ${doc.data().rg}`;
    telefone_aluno.textContent = `Telefone: ${doc.data().telefone_aluno}`;
    telefone_responsavel.textContent = `Telefone Resp.: ${doc.data().telefone_responsavel}`;
    email.textContent = `Email: ${doc.data().email}`;
    data_nascimento.textContent = `Nascimento: ${doc.data().data_nascimento}`;

    li.appendChild(nome);
    li.appendChild(cpf);
    li.appendChild(rg);
    li.appendChild(telefone_aluno);
    li.appendChild(telefone_responsavel);
    li.appendChild(email);
    li.appendChild(data_nascimento);
    li.appendChild(excluir);
    alunosList.appendChild(li);

    excluir.addEventListener("click", (event) => {
        event.stopPropagation();
        let id = li.getAttribute("data-id");
        db.collection("BD3-NoSQL-FIRESTORE").doc(id).delete().then(() => {
            li.remove();
        });
    });
}

db.collection("BD3-NoSQL-FIRESTORE")
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            renderStudent(doc);
        });
    });

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const dataNascimentoString = form.data_nascimento.value;
    const codAluno = form.cod_aluno.value;

    db.collection("BD3-NoSQL-FIRESTORE")
        .doc(codAluno)
        .set({
            cod_aluno: codAluno,
            nome: form.nome.value,
            cpf: form.cpf.value,
            rg: form.rg.value,
            telefone_aluno: form.telefone_aluno.value,
            telefone_responsavel: form.telefone_responsavel.value,
            email: form.email.value,
            data_nascimento: dataNascimentoString,
        })
        .then(() => {
            form.reset();
            window.location.reload();
        });
});