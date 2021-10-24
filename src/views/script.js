const url = `http://localhost:3333/`

function playAudio(caminho) {
    let audio = new Audio(url + caminho);
    audio.play();
}

function isset(val) {
    if (val !== undefined && val !== "" && val !== null){
        return true;
    }
    return false;
}

// JQuery functions
$(document).ready(() => {
    function getAudioData(id) {
        $.get(`${url}audio/${id}`, (res) => {
            let { comentario, caminho } = res.data;

            $(".text-error").remove();
            $("section.panel").append(`<div class='card'><p>${comentario}</p><button class='play-audio' onclick='playAudio("${caminho}")'>Ouvir</button></div>`);
        });
    }

    $("#submit-button").on("click", () => {
        let value = $("#input-block").val();

        if(isset(value)) {
            let data = JSON.stringify({ text: value });
            $("#submit-button").toggleClass('disabled');
            $("#input-block").val("");

            $.ajax({
                type: "POST",
                url: url + "audio",
                data: data,
                contentType: "application/json",
                success: ((res) => {
                    let { id } = res.data;
                    $("#submit-button").toggleClass('disabled');

                    if(isset(id)){
                        getAudioData(id);
                        alert("Cadastro efetuado com sucesso!");
                    }
                })
            })
        }else {
            alert("Insira algum valor no campo de texto.")
        }
    }); 
});