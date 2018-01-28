/* VARIAVEIS GLOBAIS */
// Arrays
var arrayUsers = [];
var arrayProjects = [];
var arrayComments = [];

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
function Project(id, titulo, autor, categoria, descricao, comentarios) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
    this.descricao = descricao;
    this.comentarios = arrayComments;
}

// Objeto para os comentarios
function Comment(autor, descricao) {
    this.autor = autor;
    this.descricao = descricao;
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

/* CODIGO GERAL */

// Dar reset a variaveis
function resetVariables() {
    userExiste = false;
    //console.log("Reseted variables")
}

// Adiciona utilizadores admin. Se for para adicionar mais, adiciona-se aqui. Admins têm a ip = "0"
function addAdminUsers() {
    arrayUsers.push(new User("Sebastião Barros", "9160272", "9160272@esmad.ipp.pt", "admin", "ESMAD", "Tecnologias e Sistemas de Informação para Web", 1));
    arrayUsers.push(new User("Hugo Barreiro", "9160151", "9160151@esmad.ipp.pt", "admin", "ESMAD", "Tecnologias e Sistemas de Informação para Web", 1));
    console.log("Adicionado utilizadores admin ao array arrayUsers[] com sucesso.")
    console.log(arrayUsers);
}

// Adiciona projetos default. Se for para adicionar mais, adiciona-se aqui
function addDefaultProjects() {
    arrayProjects.push(new Project("-1", "Default 1", "Admin", "Programação", "Descrição default.", ""));
    arrayProjects.push(new Project("-2", "Default 2", "Admin", "Design", "Descrição default.", ""));
    console.log("Adicionado projetos default ao array arrayProjects[] com sucesso.")
    console.log(arrayProjects);
}

// Preencher a tabela com todos os projetos
function carregarTabelaProjetos() {
    for (var i = 0; i < arrayProjects.length; i++) {
        $("#projectsTableBody").append('<tr><td class="idProjeto">' + arrayProjects[i].id + '<td>' + arrayProjects[i].autor + '</td><td class="tituloProjeto">' + arrayProjects[i].titulo + '</td><td>' + arrayProjects[i].categoria + '</td></tr>');
    }
}

// Preenche os dados do projeto
function carregarPerfilProjeto() {
    var id = window.location.hash.substring(1);

    for (i = 0; i < arrayProjects.length; i++) {
        if (id == arrayProjects[i].id) {
            $("#perfilTitulo").append(arrayProjects[i].titulo);
            $("#perfilMiniHeader").append('<span style="font-size:15px" class="badge badge-primary">' + arrayProjects[i].autor + '</span> <span style="font-size:15px" class="badge badge-success pull-right">' + arrayProjects[i].categoria + '</span>');
            $("#perfilDescricao").append(arrayProjects[i].descricao);
            if (arrayProjects[i].comentarios.length == 0) {
                $("#perfilComentarios").append('<div class="card"><div class="card-body bg-light"><h4 class="card-title">Ainda não há comentários neste projeto.</h4></div></div><br>');
            } else {
                for (j = 0; j < arrayProjects[i].comentarios.length; j++) {
                    $("#perfilComentarios").append('<div class="card"><div class="card-body bg-light"><h4 class="card-title">' + arrayProjects[i].comentarios[j].autor + '</h4><hr style="border: 1px solid lightblue"><p class="card-text">' + arrayProjects[i].comentarios[j].descricao + '</p></div></div><br>');
                }
            }
            break;
        }
    }
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
function addProject() {
    arrayProjects.push(new Project(
        arrayProjects.length,
        $('#pubTitulo').val(),
        //activeUser.nome,
        arrayUsers[0].nome,
        $('#pubDropCategoria option:selected').text(),
        $('#pubDescricao').val(),
        arrayComments
    ));
    console.log("New Project added: " + JSON.stringify(arrayProjects[arrayProjects.length - 1]));
    //console.log(arrayProjects);
}

// Adiciona comentarios ao array arrayComments[]
function addComment() {
    arrayComments.push(new Comment(
        activeUser.autor,
        $("#escreverComment").val()
    ));
    console.log("New comment added: " + JSON.stringify(arrayComments[arrayComments.length - 1]));
    //console.log(arrayComments);
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
        saveUsers(); // Guarda o array arrayUsers[] na localStorage
    }

    // Verifica pela key "Projetos"
    if ("Projects" in localStorage) {
        console.log('Existe a key "Projects".');
        loadProjects();
    } else {
        console.log('Nao existe a key "Projects".');
        addDefaultProjects();
        saveProjects(); // Guarda o array arrayProjects[] na localStorage
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
    console.log(arrayProjects);
}

// Guarda o array arrayUsers[] na localStoarge com a key "Users"
function saveUsers() {
    localStorage.setItem("Users", JSON.stringify(arrayUsers));
    console.log('Guardado o arrayUsers[] na localStorage com a key "Users" com sucesso.');
}

// Guarda o array arrayProjects[] na localStoarge com a key "Projects"
function saveProjects() {
    localStorage.setItem("Projects", JSON.stringify(arrayProjects));
    console.log('Guardado o arrayProjects[] na localStorage com a key "Projects" com sucesso.');
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
function deleteProject(delProject) {
    for (i = 0; i < arrayProjects.length; i++) {
        if (arrayProjects[i].numero == delproject) {
            arrayProjects.splice(i, 1);
            saveProjects();
            break;
        } else {
            alert("You're trying to delete a project that isn't registered!");
        }
    }
}

$(document).ready(function () {
    getIp(); // Obtem IP do utlizador
    checkLocalStorage(); // Verifica se já existem as keys na localStorage
    //saveProjects(); // Guarda o array arrayprojects[] na localStorage

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
                // Verifica se o utilizador já esta registado
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
            } else {
                alert("Preencha/Escolha todos os campos.");
            }
        } else {
            alert("Confirme que as palavras-passe estão corretas.");
        }
        resetVariables();
    });

    /* --- PAGINA publicar.html --- */
    // Regista um novo projeto
    $("#btnPublicar").click(function () {
        if ($("#pubTitulo").val() != "" && $("#pubDropCategoria").val() && $("#pubDescricao").val() != "") {
            addProject();
            saveProjects();
        }
    });

    /* --- PAGINA login.html --- */
    // Verifica se as credenciais de login estao corretas, e se sim define o utilizador
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

    /* --- PAGINA projetos.html --- */
    carregarTabelaProjetos();
    $('#projectsTableBody tr').css('cursor', 'pointer'); // Muda o cursor   

    // Abrir pagina perfilProjeto.html ao clicar na row da tabela
    $("#projectsTableBody tr").on('click', function () {
        $(this).each(function () {
            window.location.href = 'perfilProjeto.html' + '#' + $(this).find(".idProjeto").html();
            carregarPerfilProjeto();
        });
    })

    /* GERAR FOOTER */
    $(".bottomFooter").append('<div class="row"><div class="col-4 align-middle"><img src="../assets/common/img/logoPB.png" alt="LOGO"></div><div class="col-4 align-middle"><a class="link" href="https://cdn.menprovement.com/wp-content/uploads/2014/10/cool-guy1.jpg">Sobre nós</a></div><div class="col-4"><h4>Contactos</h4><p>9160151@esmad.ipp.pt</p><p>9160272@esmad.ipp.pt</p></div></div>');

    /* --- PAGINA perfilProjeto.html --- */
    carregarPerfilProjeto();

    /*// ABRE OS PROJETOS NA PAGINA perfilProjeto.html
    function loadProjeto() {
        var texto = window.location.hash.substring(1)
        var projetos = JSON.parse(localStorage.getItem("projetos"));

        for (var i = 0; i < arrayProjects.length; i++) {
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

    //addProjects();
    //saveProjects();*/

    /*// ADICIONAR UM NOVO PROJETO
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