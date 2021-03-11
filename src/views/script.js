const url = `http://localhost:3333/`

function playAudio(caminho) {
    let audio = new Audio(url + caminho);
    audio.play();
}

// JQuery functions
$(document).ready(() => {
    function getAudioData(id) {
        $.get(url + "audio/" + id, (res) => {
            $(".text-error").remove();
            $("section.panel").append(`<div class='card'><p>${res.data.comentario}</p><button class='play-audio' onclick='playAudio("${res.data.caminho}")'>Ouvir</butto></div>`);
        });
    }
        

    $("#submit-button").on("click", () => {
        let value = $("#input-block").val();

        if(value != undefined && value != "" && value != null) {
            let data = JSON.stringify({ text: value });

            $.ajax({
                type: "POST",
                url: url + "audio",
                data: data,
                contentType: "application/json",
                success: ((res) => {
                    if(res.data.id != undefined && res.data.id != null && res.data.id != ""){
                        $("#input-block").val("");
                        getAudioData(res.data.id);
                        alert("Cadastro efetuado com sucesso!");
                    }
                })
            })
        }else {
            alert("Insira algum valor no campo de texto.")
        }
    }); 
});