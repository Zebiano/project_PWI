// Variaveis globais
var arrayLogin = [];

// Objetos:
var utilizador = {
    nome: "",
    numero: "",
    email: "",
    password: "",
    escola: "",
    curso: "",
    ip: ""
}

$(document).ready(function() {
    // Muda os dropdown menus consoante a escolha do utilizador
    $("#dropEscola").click(function() {
        var escola = $("#dropEscola option:selected").text();
        switch (escola) {
            case 'ESMAD':
                $("#dropCurso").empty();
                $("#dropCurso").append('<option value="TSIW">Tecnologias e Sistemas de Informação para a Web</option>');
                $("#dropCurso").append('<option value="dGráfico">Design Gráfico</option>');
                $("#dropCurso").append('<option value="dIndustrial">Design Industrial</option>');
                $("#dropCurso").append('<option value="multimedia">Multimedia</option>');
                $("#dropCurso").append('<option value="audiovisual">Tecnologia da Comunicação Audiovisual</option>');
                break;

            case 'ESHT':
                $("#dropCurso").empty();
                $("#dropCurso").append('<option value="GAT">Gestão de Atividades Turísticas</option>');
                $("#dropCurso").append('<option value="GURC">Gestão de Unidades de Restauração e Catering</option>');
                $("#dropCurso").append('<option value="GAH">Gestão e Administração Hoteleira</option>');
                break;
        }
    });

    // Grava para o objeto "Utilizador" caso todos os campos tenham sido devidamente preenchidos
    $("#btnSubmit").click(function() {
        utilizador.nome = $("#nome").val();
        utilizador.numero = $("#numero").val();
        utilizador.email = $("#email").val();
        // So grava a password caso a pass e o confirmarPass sejam iguais
        if ($("#password").val() == $("#cPassword").val()) {
            utilizador.password = $("#password").val();
        } else {
            alert("Confirme a plavra-passe.");
        }
        utilizador.escola = $("#dropEscola option:selected").text();
        utilizador.curso = $("#dropCurso option:selected").text();
        $.getJSON("https://api.ipify.org?format=json", function(output) {
            utilizador.ip = output.ip;
        });
        //console.log(utilizador);

        // Grava o objeto login para o array caso o objeto esteja preenchido
        if (utilizador.nome != "" && utilizador.numero != "" && utilizador.email != "" && utilizador.password != "" && utilizador.escola != "" && utilizador.curso != "" && utilizador.ip != "") {
            arrayLogin.push(utilizador);
            console.log(arrayLogin);
        }
    });
});