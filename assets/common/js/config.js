/* --- VARIAVEIS GLOBAIS --- */
// Arrays
var arrayUsers = [];
var arrayProjects = [];
var arrayComments = [];

// Variaveis
var ip;
var activeUser;
var userExiste = false;
var defaultProjects;

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
    this.comentarios = comentarios;
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
    activeUser;
    arrayComments = [];
    //console.log("Reseted variables")
}

// Devolve true caso o utilizador esteja logged in
function checkLogin() {
    if ("ActiveUser" in localStorage) {
        return true
    } else {
        return false
    }
}

// Adiciona utilizadores admin. Se for para adicionar mais, adiciona-se aqui. Admins têm a ip = "0"
function addAdminUsers() {
    arrayUsers.push(new User("Sebastião Barros", "9160272", "9160272@esmad.ipp.pt", "admin", "ESMAD", "Tecnologias e Sistemas de Informação para Web", 1));
    arrayUsers.push(new User("Hugo Barreiro", "9160151", "9160151@esmad.ipp.pt", "admin", "ESMAD", "Tecnologias e Sistemas de Informação para Web", 1));

    console.log("Adicionado utilizadores admin ao array arrayUsers[] com sucesso.")
    console.log(arrayUsers);
}

// Adiciona projetos default. Se for para adicionar mais, adiciona-se aqui. Quando se adciiona tem que se mudar o numero tmb na funcao addProject()
function addDefaultProjects() {
    arrayProjects.push(new Project("-1", "Default 1", "Admin", "Programação", "Descrição default.", arrayComments));
    arrayProjects.push(new Project("-2", "Default 2", "Admin", "Design", "Descrição default.", arrayComments));

    // Default comments
    arrayComments.push(new Comment("Admin", "Default comment 1"));
    arrayComments.push(new Comment("Admin", "Default comment 2"));
    console.log(arrayComments);

    console.log("Adicionado projetos default ao array arrayProjects[] com sucesso.")
    console.log(arrayProjects);
}

// Preencher a tabela com todos os projetos
function carregarTabelaProjetos() {
    for (var i = 0; i < arrayProjects.length; i++) {
        $("#projectsTableBody").append('<tr id="projId' + arrayProjects[i].id + '"><td>' + arrayProjects[i].autor + '</td><td class="tituloProjeto">' + arrayProjects[i].titulo + '</td><td>' + arrayProjects[i].categoria + '</td></tr>');
    }
}

// Preenche os dados do projeto
function carregarPerfilProjeto() {
    var id = window.location.hash.substring(7);

    for (i = 0; i < arrayProjects.length; i++) {
        if (id == arrayProjects[i].id) {
            $("#perfilTitulo").append(arrayProjects[i].titulo);
            $("#perfilMiniHeader").append('<span style="font-size:15px" class="badge badge-primary">' + arrayProjects[i].autor + '</span> <span style="font-size:15px" class="badge badge-success pull-right">' + arrayProjects[i].categoria + '</span>');
            $("#perfilDescricao").append(arrayProjects[i].descricao);
            if (arrayProjects[i].comentarios.length == 0) {
                $("#perfilComentarios").append('<div class="card"><div class="card-body bg-light"><h4 class="card-title">Ainda não há comentários neste projeto.</h4></div></div><br>');
            } else {
                //alert(JSON.stringify(arrayProjects[0].comentarios[0].arrayComments));
                for (j = 0; j < arrayProjects[i].comentarios.length; j++) {
                    $("#perfilComentarios").append('<div class="card"><div class="card-body bg-light"><h4 class="card-title">' + arrayProjects[i].comentarios[j].autor + '</h4><hr style="border: 1px solid lightblue"><p class="card-text">' + arrayProjects[i].comentarios[j].descricao + '</p></div></div><br>');
                }
                /*for (j = 0; j < arrayProjects[i].comentarios.length; j++) {
                    for (q = 0; q < arrayProjects[i].comentarios[j].length; q++) {
                        alert(JSON.stringify(arrayProjects[i].comentarios[j].autor[q]));
                        $("#perfilComentarios").append('<div class="card"><div class="card-body bg-light"><h4 class="card-title">' + arrayProjects[i].comentarios[j].autor[q] + '</h4><hr style="border: 1px solid lightblue"><p class="card-text">' + arrayProjects[i].comentarios[j].descricao[q] + '</p></div></div><br>');
                    }
                    //$("#perfilComentarios").append('<div class="card"><div class="card-body bg-light"><h4 class="card-title">' + arrayProjects[i].comentarios[j].nome + '</h4><hr style="border: 1px solid lightblue"><p class="card-text">' + arrayProjects[i].comentarios[j].descricao + '</p></div></div><br>');
                }*/
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
    alert("Novo utilizador registado com sucesso!");
}

// Adicionar projetos ao array arrayProjects[]
function addProject() {
    arrayProjects.push(new Project(
        arrayProjects.length - 2, // 2 = numero de projetos default
        $('#pubTitulo').val(),
        activeUser.nome,
        $('#pubDropCategoria option:selected').text(),
        $('#pubDescricao').val(),
        arrayComments
    ));
    console.log("New Project added: " + JSON.stringify(arrayProjects[arrayProjects.length - 1]));
    //console.log(arrayProjects);
    alert("Novo projeto registado com sucesso!");
}

// Adiciona comentarios ao array arrayComments[]
function addComment(autor, descricao) {
    if (autor != undefined && descricao != undefined) {
        arrayComments.push(new Comment(
            autor,
            descricao
        ));
    } else {
        arrayComments.push(new Comment(
            activeUser.nome,
            $("#txtComment").val()
        ));
    }
    console.log("New comment added: " + JSON.stringify(arrayComments[arrayComments.length - 1]));
    //console.log(arrayComments);
}

/* --- ADICIONAR OBJETOS A VARIAVEIS --- */
// Adiciona o objeto User a variavel activeUser
function addActiveUser(i) {
    activeUser = arrayUsers[i];
    //console.log(activeUser);
}

/* --- ADICIONA ARRAY A OBJETO --- */
// Guarda o array arrayComments[] no objeto Project
function pushComment(idProj) {
    for (i = 0; i < arrayProjects.length; i++) {
        if (arrayProjects[i].id == idProj) {
            arrayProjects[i].comentarios = arrayComments;
            console.log('Guardado o arrayComments[] no objeto Project com sucesso.');
            break;
        }
    }
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
    console.log("---");
    // Verifica pela key "Projetos"
    if ("Projects" in localStorage) {
        console.log('Existe a key "Projects".');
        loadProjects();
    } else {
        console.log('Nao existe a key "Projects".');
        addDefaultProjects();
        saveProjects(); // Guarda o array arrayProjects[] na localStorage
    }
    console.log("---");
    // Verifica pela key "ActiveUser"
    if ("ActiveUser" in localStorage) {
        console.log('Existe a key "ActiveUser".');
        loadActiveUser();
    } else {
        console.log('Nao existe a key "ActiveUser".');
        saveActiveUser(); // Guarda o objeto ActiveUser na localStorage
    }
}

// Grava os objetos que estao na localStorage para o array arrayUsers[]
function loadUsers() {
    arrayUsers = JSON.parse(localStorage.getItem("Users"));
    console.log("Carregado 'Users' da localStorage para o array arrayUsers[] com sucesso.");
    console.log(arrayUsers);
}

// Grava os objetos que estao na localStorage para o array arrayProjects[]
function loadProjects() {
    arrayProjects = JSON.parse(localStorage.getItem("Projects"));
    console.log("Carregado 'Projects' da localStorage para o array arrayProjects[] com sucesso.");
    console.log(arrayProjects);
}

// Grava os objetos que estao na localStorage para a variavel activeUser
function loadActiveUser() {
    activeUser = JSON.parse(localStorage.getItem("ActiveUser"));
    console.log("Carregado 'ActiveUser' da localStorage para a variavel activeUser com sucesso.");
    console.log(activeUser);
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

// Guarda o Objeto activeUser na localStoarge com a key "ActiveUser"
function saveActiveUser() {
    if (activeUser != undefined) {
        localStorage.setItem("ActiveUser", JSON.stringify(activeUser));
        console.log('Guardado o objeto activeUser na localStorage com a key "ActiveUser" com sucesso.');
    }
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

// Elimina o activeUser da localStorage
function deleteActiveUser(delActiveUser) {
    alert("User " + activeUser.nome + " (" + activeUser.numero + ") successfully logged out.");
    localStorage.removeItem("ActiveUser");
    resetVariables();
}

/* --- CODIGO PARA CORRER QUANDO O DOCUMENTO ESTIVER PRONTO --- */
$(document).ready(function () {
    getIp(); // Obtem IP do utlizador
    console.log("---");
    checkLocalStorage(); // Verifica se já existem as keys na localStorage
    console.log("---");

    /* --- PAGINA home.html --- */
    // So quem esta logged-in pode publicar
    $("#btnHomePublicar").click(function () {
        if (checkLogin() == true) {
            window.location.href = "pages/publicar.html";
        } else {
            window.location.href = "pages/login.html" + "#publicar";
        }
    });

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
                    $('#formRegistar').attr('action', 'login.html');
                }
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
            if (checkLogin() == true) {
                addProject();
                saveProjects();
                $('#formPublicar').attr('action', 'projetos.html');
            } else {
                $('#formPublicar').attr('action', "login.html" + "#publicar");
            }
        }
    });

    /* --- PAGINA login.html --- */
    // Verifica se as credenciais de login estao corretas, e se sim define o utilizador
    $("#btnLogin").click(function () {
        if ($("#loginNumero").val() != "" && $("#loginPassword").val() != "") {
            for (i = 0; i < arrayUsers.length; i++) {
                if (arrayUsers[i].numero == $("#loginNumero").val() && arrayUsers[i].password == $("#loginPassword").val()) {
                    // Define o utilizador que fez login
                    addActiveUser(i);
                    saveActiveUser();
                    alert("Credenciais corretas, login com sucesso.");

                    var path = window.location.hash.substring(1)
                    if (path == "publicar") { // Se o utilizador foi parar ao login ao clicar para publicar um projeto
                        window.location.href = "publicar.html";
                        $('#formLogin').attr('action', "publicar.html");
                    } else if (path == "projetos") { // Se o utilizador foi parar ao login ao clicar para ver os projetos
                        window.location.href = "projetos.html";
                        $('#formLogin').attr('action', "projetos.html");
                    } else {
                        $('#formLogin').attr('action', "../home.html");
                    }
                    break;
                } else if (i == arrayUsers.length - 1) {
                    alert("Credenciais incorretas, tente novamente.");
                }
            }
        }
    });

    /* --- PAGINA projetos.html --- */
    // Carrega os dados da tabela caso o utlizador estiver na pagina projetos.html
    if (window.location.pathname.indexOf("pages/projetos.html") != -1) {
        if (checkLogin() == true) {
            carregarTabelaProjetos();
        } else {
            window.location.href = "login.html";
        }
    }

    // Abrir pagina perfilProjeto.html ao clicar na row da tabela
    $("#projectsTableBody tr").on('click', function () {
        $(this).each(function () {
            window.location.href = 'perfilProjeto.html' + '#' + $(this).attr("id");
            carregarPerfilProjeto();
        });
    })

    // Muda o cursor
    $('#projectsTableBody tr').css('cursor', 'pointer');

    /* --- PAGINA perfilProjeto.html --- */
    // Carrega os dados do projeto caso o utlizador estiver na pagina perfilProjeto.html
    if (window.location.pathname.indexOf("pages/perfilProjeto.html") != -1) {
        if (checkLogin() == true) {
            carregarPerfilProjeto();
            $("#newComment").hide();
        } else {
            var pages = checkPath();
            if (pages == false) {
                window.location.href = 'pages/login.html'
            } else {
                window.location.href = 'login.html'
            }
        }
    }

    // Pop up de uma textarea para comentar
    $("#btnAddComment").click(function () {
        $("#btnAddComment").hide();
        $("#newComment").show();

        $("#btnConfirmComment").click(function () {
            if ($("#txtComment").val() != "") {
                resetVariables(); // Limpar o array arrayComments[]

                // Buscar os comments da localStorage e gravarlos no array arrayComments[]
                for (i = 0; i < arrayProjects.length; i++) {
                    if (arrayProjects[i].id == window.location.hash.substring(7)) {
                        // Importante este variavel ser declarada fora porque senao pode ocorrer um ciclo for infinito na proxima linha
                        var length = arrayProjects[i].comentarios.length;
                        for (j = 0; j < length; j++) {
                            addComment(arrayProjects[i].comentarios[j].autor, arrayProjects[i].comentarios[j].descricao);
                        }
                        break;
                    }
                }

                addComment(); // Adicionar o novo comenario ao array
                pushComment(window.location.hash.substring(7)); // Atualizar o array arrayProjects[] com o novo comentário
                saveProjects(); // Atualizar a localStorage com o novo array arrayProjects[]

                location.reload(); // Recarregar a pagina para mostrar o novo comentario
            } else {
                alert("Tem que escrever algo para poder comentar!");
            }
        });
    });

    /* --- GERAR FOOTER --- */
    $(".bottomFooter").append('<div class="row"><div class="col-4 align-middle"><img src="../assets/common/img/logoPB.png" alt="LOGO"></div><div class="col-4 align-middle"><a class="link" href="https://cdn.menprovement.com/wp-content/uploads/2014/10/cool-guy1.jpg">Sobre nós</a></div><div class="col-4"><h4>Contactos</h4><p>9160151@esmad.ipp.pt</p><p>9160272@esmad.ipp.pt</p></div></div>');
});