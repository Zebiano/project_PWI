$(document).ready(function () {
    var activeBolinha1 = false;
    var activeBolinha2 = false;
    var activeBolinha3 = false;
    var activeBolinha4 = false;

    $('.navbar').on('mousedown touchstart', function () {
        // Primeira bolinha
        if (!activeBolinha1) {
            $(this).find('.navBolinha1').css({ 'background-color': 'gray', 'transform': 'translate(0px,125px)' });
        } else {
            $(this).find('.navBolinha1').css({ 'background-color': 'dimGray', 'transform': 'none' });
        }

        // Segunda bolinha
        if (!activeBolinha2) {
            $(this).find('.navBolinha2').css({ 'background-color': 'gray', 'transform': 'translate(60px,105px)' });
        } else {
            $(this).find('.navBolinha2').css({ 'background-color': 'darkGray', 'transform': 'none' });
        }

        // Terceira bolinha
        if (!activeBolinha3) {
            $(this).find('.navBolinha3').css({ 'background-color': 'gray', 'transform': 'translate(105px,60px)' });
        } else {
            $(this).find('.navBolinha3').css({ 'background-color': 'silver', 'transform': 'none' });
        }

        // Quarta bolinha
        if (!activeBolinha4) {
            $(this).find('.navBolinha4').css({ 'background-color': 'gray', 'transform': 'translate(125px,0px)' });
        } else {
            $(this).find('.navBolinha4').css({ 'background-color': 'silver', 'transform': 'none' });
        }

        activeBolinha1 = !activeBolinha1;
        activeBolinha2 = !activeBolinha2;
        activeBolinha3 = !activeBolinha3;
        activeBolinha4 = !activeBolinha4;
    });

    // Demonstra ao utilziador que esta signed-in
    if (checkLogin() == true) {
        $(".navBg").append('<h1>' + activeUser.nome.substring(0, 1) + '</h1>');
    } else {
        $(".navBg").append('<i class="fa fa-bars fa-3x"></i>');
    }

    $("#navIconSingIn").click(function () {
        var pages = checkPath();
        if (checkLogin() == true) {
            deleteActiveUser();
            if (pages == false) {
                window.location.href = 'home.html'
            } else {
                window.location.href = '../home.html'
            }
        } else {
            if (pages == false) {
                window.location.href = 'pages/login.html'
            } else {
                window.location.href = 'login.html'
            }
        }
    });
    $("#navIconPuzzlePiece").click(function () {
        var pages = checkPath();
        if (checkLogin() == true) {
            if (pages == false) {
                window.location.href = 'pages/projetos.html'
            } else {
                window.location.href = 'projetos.html'
            }
        } else {
            if (pages == false) {
                window.location.href = 'pages/login.html' + "#projetos"
            } else {
                window.location.href = 'login.html' + "#projetos"
            }
        }
    });
    $("#navIconPlus").click(function () {
        var pages = checkPath();
        if (checkLogin() == true) {
            if (pages == false) {
                window.location.href = 'pages/publicar.html'
            } else {
                window.location.href = 'publicar.html'
            }
        } else {
            if (pages == false) {
                window.location.href = 'pages/login.html' + "#publicar"
            } else {
                window.location.href = 'login.html' + "#publicar"
            }
        }
    });
    $("#navIconHome").click(function () {
        var pages = checkPath();
        if (pages == false) {
            window.location.href = 'home.html'
        } else {
            window.location.href = '../home.html'
        }
    });
});

function checkPath() {
    var path = window.location.pathname;
    if (path.indexOf("pages") == -1) {
        return false
    } else {
        return true
    }
}