/* VARIAVEIS GLOBAIS */
// Arrays
var arrayUsers = [];
var arrayProjetos = [];

// Variaveis
var ip;
var activeUser;
var userExiste = false;

/* --- CONSTRUTORES --- */
// Objeto para os utilizadores
function User(nome, numero, email, password, escola, curso, ip) {
    this.nome = nome;
    this.numero = numero;
    this.email = email;
    this.password = password;
    this.escola = escola;
    this.curso = curso;
    this.ip = ip;
}

// Objeto para os projetos
function Project(titulo, autor, categoria, descricao, resposta) {
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
    this.descricao = descricao;
    this.resposta = resposta;
}

/* --- API --- */
// Obter IP do utilizador
function getIp() {
    $.ajax({
        dataType: "json",
        url: "https://api.ipify.org?format=json",
        async: false,
        success: function (output) {
            ip = output.ip;
            console.log("IP do utlizador: " + ip);
        },
        error: function (output) {
            console.log("Erro: " + output);
            ip = 0;
        }
    });
}

// Dar reset a variaveis
function resetVariables() {
    userExiste = false;
    //console.log("Reseted variables")
}

// Adicona utilizadores admin. Se for para adicionar mais, adiciona-se aqui. Admins têm a ip = "0"
function addAdminUsers() {
    arrayUsers.push(new User("Sebastião Barros", "9160272", "9160272@esmad.ipp.pt", "admin", "ESMAD", "Tecnologias e Sistemas de Informação para Web", 1));
    arrayUsers.push(new User("Hugo Barreiro", "9160151", "9160151@esmad.ipp.pt", "admin", "ESMAD", "Tecnologias e Sistemas de Informação para Web", 1));
    console.log("Adicionado utilizadores admin com sucesso.")
    console.log(arrayUsers);
}

/* --- ADICIONAR OBJETOS AOS ARRAYS --- */
// Adiciona utilizadores ao array arrayUsers[]
function addUser() {
    arrayUsers.push(new User(
        $("#regNome").val(),
        $("#regNumero").val(),
        $("#regEmail").val(),
        $("#regPassword").val(),
        $("#regDropEscola option:selected").text(),
        $("#regDropCurso option:selected").text(),
        ip
    ));
    console.log("New user added: " + JSON.stringify(arrayUsers[arrayUsers.length - 1]));
    //console.log(arrayUsers);
}

// Adicionar projetos ao array arrayProjects[]
function addProjects(titulo, categoria, descricao) {
    arrayProjetos.push(new Project(
        $('#txtTitulo').val(),
        activeUser.nome,
        $('#dropCategoria option:selected').text(),
        $('#txtDesc').val(),
    ));
    var titulo = $('#txtTitulo').val();
    var categoria = $('#dropCategoria option:selected').text();
    var descricao = $('#txtDesc').val();

    arrayProjetos.push(new Project(titulo, "teste", categoria, descricao, ""));
    console.log(arrayProjetos);
}

/* --- LOCALSTORAGE --- */
// Verifica se ja estao defenidas as keys na localStorage
function checkLocalStorage() {
    // Verifica pela key "Users"
    if ("Users" in localStorage) {
        console.log('Existe a key "Users".');
        loadUsers();
    } else {
        console.log('Nao existe a key "Users".');
        addAdminUsers();
    }

    // Verifica pela key "Projetos"
    if ("Projects" in localStorage) {
        console.log('Existe a key "Projects".');
        loadProjects();
    } else {
        console.log('Nao existe a key "Projects".');
    }
}

// Grava os objetos que estao na localStorage para o array arrayUsers[]
function loadUsers() {
    arrayUsers = JSON.parse(localStorage.getItem("Users"));
    console.log("Carregado Users da localStorage para o array arrayUsers[] com sucesso.");
    console.log(arrayUsers);
}

// Grava os objetos que estao na localStorage para o array arrayProjects[]
function loadProjects() {
    arrayProjects = JSON.parse(localStorage.getItem("Projects"));
    console.log("Carregado Projetos da localStorage para o array arrayProjects[] com sucesso.");
    console.log(arrayProjetos);
}

// Guarda o array arrayUsers[] na localStoarge com a key "Users"
function saveUsers() {
    localStorage.setItem("Users", JSON.stringify(arrayUsers));
}

// Guarda o array arrayProjetos[] na localStoarge com a key "Projetos"
function saveProjects() {
    localStorage.setItem("Projects", JSON.stringify(arrayProjects));
    console.log(localStorage);
}

// Elimina o especificado User do array e atualiza a localStorage
function deleteUser(delUser) {
    for (i = 0; i < arrayUsers.length; i++) {
        if (arrayUsers[i].numero == delUser) {
            arrayUsers.splice(i, 1);
            saveUsers();
            break;
        } else {
            alert("You're trying to delete a user that isn't registered!");
        }
    }
}

// Elimina o especificado Projeto do array e atualiza a localStorage
function deleteProject(delpProject) {
    for (i = 0; i < arrayProjetos.length; i++) {
        if (arrayProjetos[i].numero == delproject) {
            arrayProjetos.splice(i, 1);
            saveProjects();
            break;
        } else {
            alert("You're trying to delete a project that isn't registered!");
        }
    }
}

$(document).ready(function () {
    // Obtem IP do utlizador
    getIp();

    // Verifica se já existem as keys na localStorage
    checkLocalStorage();

    // Guarda os arrays na localStorage
    saveUsers();
    //saveProjects();

    /* --- PAGINA registar.html --- */
    // Muda os dropdown menus consoante a escolha do utilizador
    $("#regDropEscola").click(function () {
        var escola = $("#regDropEscola option:selected").text();
        switch (escola) {
            case 'ESMAD':
                $("#regDropCurso").empty();
                $("#regDropCurso").append('<option value="TSIW">Tecnologias e Sistemas de Informação para a Web</option>');
                $("#regDropCurso").append('<option value="dGráfico">Design Gráfico</option>');
                $("#regDropCurso").append('<option value="dIndustrial">Design Industrial</option>');
                $("#regDropCurso").append('<option value="multimedia">Multimedia</option>');
                $("#regDropCurso").append('<option value="audiovisual">Tecnologia da Comunicação Audiovisual</option>');
                break;
            case 'ESHT':
                $("#regDropCurso").empty();
                $("#regDropCurso").append('<option value="GAT">Gestão de Atividades Turísticas</option>');
                $("#regDropCurso").append('<option value="GURC">Gestão de Unidades de Restauração e Catering</option>');
                $("#regDropCurso").append('<option value="GAH">Gestão e Administração Hoteleira</option>');
                break;
        }
    });

    // Regista um novo utlizador
    $("#btnRegistar").click(function () {
        if ($("#regPassword").val() == $("#regConfPassword").val()) {
            if ($("#regNome").val() != "" && $("#regNumero").val() && $("#regEmail").val() && $("#regDropEscola").val() && $("#regDropCurso").val()) {
                // Verifica se o outilizador já esta registado
                for (i = 0; i < arrayUsers.length; i++) {
                    if (arrayUsers[i].numero == $("#regNumero").val()) {
                        alert("Esse utilizador já está registado!");
                        userExiste = true;
                        break;
                    }
                }
                // Caso o utilizador nao "existir" regista-o
                if (userExiste == false) {
                    addUser();
                    saveUsers();
                }
            }
        } else {
            alert("Confirme que as palavras-passe estão corretas.");
        }
        resetVariables();
    });

    /* --- PAGINA login.html --- */
    $("#btnLogin").click(function () {
        if ($("#loginNumero").val() != "" && $("#loginPassword").val() != "") {
            for (i = 0; i < arrayUsers.length; i++) {
                if (arrayUsers[i].numero == $("#loginNumero").val() && arrayUsers[i].password == $("#loginPassword").val()) {
                    // Define o utilizador que fez login
                    activeUser = arrayUsers[i];
                    //alert(JSON.stringify(activeUser));
                    break;
                } else {
                    alert("Credenciais incorretas, tente novamente.");
                    break;
                }
            }
        }
    });

    /*
    // Preencher a tabela com todos os projetos em storage
    function carregarTabela() {
        var projetos = JSON.parse(localStorage.getItem("projetos"));
        console.log(projetos);
        for (var i = 0; i < projetos.length; i++) {
            $("#tbody").append('<tr><td>' + projetos[i].autor + '</td><td class="tituloProjeto">' + projetos[i].titulo + '</td><td>' + projetos[i].categoria + '</td></tr>');
        }

        //abrir nova janela ao clicar na row da tabela
        $('tbody tr').on('click', function () {
            // window.location.href = "perfilProjeto.html";
            $(this).each(function () {
                var texto = $(this).find(".tituloProjeto").html();

                window.location.href = 'perfilProjeto.html' + '#' + texto;

            });
        })
    }

    carregarTabela()

    //ABRE OS PROJETOS NA PAGINA perfilProjeto.html
    function loadProjeto() {
        var texto = window.location.hash.substring(1)
        var projetos = JSON.parse(localStorage.getItem("projetos"));

        for (var i = 0; i < projetos.length; i++) {
            console.log(projetos[i].descricao)
            if (projetos[i].titulo == texto && projetos[i].resposta == "") {
                $("#perfilTitulo").append(projetos[i].titulo);
                $("#perfilTitulo").append('<span style="font-size:15px" class="badge badge-success" id="perfilCat">' + projetos[i].categoria + '</span>');
                $("#perfilDesc").append(projetos[i].descricao);
                $("#perfilAutor").append(projetos[i].autor);
                $("#perfilResposta").append('<br> <textarea name="" id="perfilResposta" cols="60" rows="10"></textarea>');
            }
            else if (projetos[i].titulo == texto) {
                $("#perfilTitulo").append(projetos[i].titulo);
                $("#perfilTitulo").append('<span style="font-size:15px" class="badge badge-success" id="perfilCat">' + projetos[i].categoria + '</span>');
                $("#perfilDesc").append(projetos[i].descricao);
                $("#perfilAutor").append(projetos[i].autor);
                $("#perfilResposta").append(projetos[i].resposta);
            }
        }
    }
    loadProjeto()

    // Carregar do localStorage para o array
    //users = JSON.parse(localStorage.getitem("users"));
    

    console.log(arrayUsers);


    //ADICIONAR UM NOVO PROJETO
    $("#confProj").click(function () {
        var titulo = $('#txtTitulo').val();
        var descricao = $('#txtDesc').val();
        var categoria = $('#dropCategoria option:selected').text();

        projetos.push(new Project(titulo, "teste", categoria, descricao, ""))
        console.log(arrayProjects)

        localStorage.setItem("projetos", JSON.stringify(arrayProjects));
        console.log(localStorage)
    });*/
});