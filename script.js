const SUPABASE_URL = "https://wgnxvbbannjharrhxapb.supabase.co";
const SUPABASE_KEY = "sb_publishable_dggGzMqY8rw_ZRpDEfVgFw_Q4ebqtlb";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const formChamado = document.getElementById("formChamado");
const lista = document.getElementById("lista");

formChamado.addEventListener("submit", async function(event) {

    event.preventDefault();

    const equipamento = document.getElementById("equipamento").value;
    const problema = document.getElementById("problema").value;
    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;

    const { data, error } = await supabase
        .from("chamados")
        .insert([
            {
                equipamento: equipamento,
                problema: problema,
                descricao: descricao,
                prioridade: prioridade
            }
        ]);

    if (error) {
        console.log(error);
        alert("Erro ao cadastrar chamado!");
        return;
    }

    alert("Chamado cadastrado com sucesso!");

    formChamado.reset();

    carregarChamados();
});

async function carregarChamados() {

    const { data, error } = await supabase
        .from("chamados")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.log(error);
        lista.innerHTML = "Erro ao carregar chamados.";
        return;
    }

    if (data.length === 0) {
        lista.innerHTML = "Nenhum chamado cadastrado.";
        return;
    }

    lista.innerHTML = "";

    data.forEach(function(chamado) {

        const div = document.createElement("div");

        div.innerHTML = `
            <hr>
            <h3>Equipamento: ${chamado.equipamento}</h3>
            <p><strong>Problema:</strong> ${chamado.problema}</p>
            <p><strong>Descrição:</strong> ${chamado.descricao}</p>
            <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
        `;

        lista.appendChild(div);
    });
}


// Carregar chamados quando abrir a página
carregarChamados();
