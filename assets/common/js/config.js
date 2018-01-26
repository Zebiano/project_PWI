

$("#dropEscola").click(function () {

    var escola = $("#dropEscola option:selected").text();
    console.log(escola)
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