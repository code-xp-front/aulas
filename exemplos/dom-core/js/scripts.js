var notes = [];

function updateSection(section) {
    var innerHTML = "";

    for (var index = 0; index < notes.length; index++) {
        if (notes[index].editing) {
            innerHTML += '<form class="note">'+
                             '<input class="note__title" type="text" name="title" value="' + notes[index].title + '" placeholder="Título" />' +
                             '<textarea class="note__body" name="body" rows="5" placeholder="Criar uma nota...">' + notes[index].body + '</textarea>' +
                             '<button class="note__control" type="button" onclick="onDoneClick(this.form, this.form.parentElement, this.form.title, this.form.body, ' + index + ')">' +
                                'Concluído' +
                             '</button>' +
                         '</form>';
        } else {
            innerHTML += '<form class="note" onclick="onEditClick(this.parentElement, ' + index + ')">'+
                             '<button class="note__control" type="button" onclick="onRemoveClick(this.form.parentElement, ' + index + ')">' +
                                 '<i class="fa fa-times" aria-hidden="true"></i>' +
                             '</button>' +
                             '<h1 class="note__title">' + notes[index].title + '</h1>' +
                             '<p class="note__body">' + notes[index].body + '</p>' +
                         '</form>';
        }
    }

    section.innerHTML = innerHTML;
}

function onDoneClick(form, section, inputTitle, textAreaBody, index) {
    if (index === null) {
        // criar uma nota
        var note = {
            title: inputTitle.value,
            body: textAreaBody.value
        };

        // adicionarz a nota
        notes.push(note);

        // atualizar a tela
        updateSection(section);

        //limpar o formulario
        form.reset();
    } else {
        // alterar a nota
        notes[index].title = inputTitle.value;
        notes[index].body = textAreaBody.value;
        notes[index].editing = false;

        // atualizar a tela
        updateSection(section);
    }
}

function onRemoveClick(section, index) {
    // remover a nota
    notes.splice(index, 1);

    // atualizar a tela
    updateSection(section);
}

function onEditClick(section, index) {
    // adicionar atributo editando
    notes[index].editing = true;

    // atualizar a tela
    updateSection(section);
}