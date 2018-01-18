var notes = [];

function updateNotesList() {
    var sectionNotes = document.getElementById("notes");
    var innerHTML = "";

    for (var index = 0; index < notes.length; index++) {
        innerHTML += '<div class="note">'+
                        '<button class="note__control" type="button" onclick="onRemoveClick(' + index + ')">' +
                            '<i class="fa fa-times" aria-hidden="true"></i>' +
                        '</button>' +
                         '<h1 class="note__title">' + notes[index].title + '</h1>' +
                         '<p class="note__body">' + notes[index].body + '</p>' +
                     '</div>';
    }

    sectionNotes.innerHTML = innerHTML;
}

function onDoneClick(form, inputTitle, textAreaBody) {
    // criar uma nota
    var note = {
        title: inputTitle.value,
        body: textAreaBody.value
    };

    // adicionar a nota
    notes.push(note);

    // atualizar lista na tela
    updateNotesList();

    //limpar o formulario
    form.reset();
}

function onRemoveClick(index) {
    // remover a nota nota
    notes.splice(index, 1);

    // atualizar lista na tela
    updateNotesList();
}