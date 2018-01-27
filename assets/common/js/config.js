// Variaveis globais
var arrayUsers = [];
var ip;
var projetos = [];

// Utilizadorees predefenidos
function User(nome, numero, email, password, escola, curso, ip) {
    this.nome = nome;
    this.numero = numero;
    this.email = email;
    this.password = password;
    this.escola = escola;
    this.curso = curso;
    this.ip = ip;
}

// Classe de projeto
function Projeto(titulo, autor, categoria, descricao, resposta) {
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
    this.descricao = descricao;
    this.resposta = resposta;
}


$(document).ready(function () {
    // Obter IP do utilizador
    $.getJSON("https://api.ipify.org?format=json", function (output) {
        ip = output.ip;
        arrayUsers.push(new User("Sebastião Barros", "9160272", "9160272@esmad.ipp.pt", "admin", "ESMAD", "Tecnologias e Sistemas de Informação para Web", ip));
        arrayUsers.push(new User("Hugo Barreiro", "9160151", "9160151@esmad.ipp.pt", "admin", "ESMAD", "Tecnologias e Sistemas de Informação para Web", ip));
    });

    //Preencher a tabela com todos os projetos em storage
    function carregarTabela() {
        var projetos = JSON.parse(localStorage.getItem("projetos"));
        console.log(projetos);
        for (var i = 0; i < projetos.length; i++) {
            $("#tbody").append('<tr><td>' + projetos[i].autor + '</td><td>' + projetos[i].titulo + '</td><td>' + projetos[i].categoria + '</td></tr>');
        }

        //EM CONSTRUÇÃO -------------------------------------------------

        //abrir nova janela ao clicar na row da tabela
        $('tbody tr').on('click', function () {
           // window.location.href = "perfilProjeto.html";
           $(this).each(function () {
            var texto = $(this).find(".tituloProjeto").text();
            console.log(texto)
        });
        })

          //EM CONSTRUÇÃO----------------------------------------------


    }
    
    carregarTabela()

    

    function loadProjeto() {
        var text = window.location.hash.substring(1)

        for (var i = 0; i < projetos.length; i++) {
            if (projetos[i].titulo == text) {

            }
        }

    }

    /*
    // Carregar do localStorage para o array
    users = JSON.parse(localStorage.getitem("users"));
    */

    console.log(arrayUsers);



    //ADICIONAR UM NOVO PROJETO
    $("#confProj").click(function () {
        var titulo = $('#txtTitulo').val();
        var desc = $('#txtDesc').val();
        var categoria = $('#dropCategoria option:selected').text();

        projetos.push(new Projeto(titulo, "teste", categoria, desc, ""))
        console.log(projetos)

        localStorage.setItem("projetos", JSON.stringify(projetos));
        console.log(localStorage)
    });




    // Muda os dropdown menus consoante a escolha do utilizador
    $("#dropEscola").click(function () {
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
    $("#btnSubmit").click(function () {
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
        utilizador.ip = ip;

        // Grava o objeto login para o array caso o objeto esteja preenchido
        if (utilizador.nome != "" && utilizador.numero != "" && utilizador.email != "" && utilizador.password != "" && utilizador.escola != "" && utilizador.curso != "" && utilizador.ip != "") {
            arrayUsers.push(utilizador);
            console.log(arrayUsers);
        }

        // Guarda o array na localStorage

    });
});