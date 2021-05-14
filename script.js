var vId, vName, vEmail, vRegister;

const readForm = () => {
    vId = $('#id').val();
    vName = $('#name').val();
    vEmail = $('#email').val();
}

const clearForm = () => {
    $('section .form input').val('');
}

const editRegister = (id, name, email) => {
    $('#id').val(id);
    $('#name').val(name);
    $('#email').val(email);
}

const createCustomElement = (element, text, className) => {
    const e = document.createElement(element);
    e.className = className || null;
    e.innerText = text || null;
    return e;
}

const appendRegister = () => {
    const tbody = document.querySelector('.registers__table tbody');

    const tr = document.createElement('tr');
    tr.appendChild(createCustomElement('td', vId));
    tr.appendChild(createCustomElement('td', vName));
    tr.appendChild(createCustomElement('td', vEmail));

    const tdButtons = createCustomElement('td');

    const buttonEdit = createCustomElement('button', 'Editar', 'btn btn-primary');
    buttonEdit.setAttribute('onclick', `editRegister("${vId}","${vName}","${vEmail}")`);

    const buttonDelete = createCustomElement('button', 'Deletar', 'btn btn btn-danger');
    buttonDelete.setAttribute('onclick', `deleleRegister("${vId}")`);

    tdButtons.appendChild(buttonEdit);
    tdButtons.appendChild(buttonDelete);

    tr.appendChild(tdButtons);

    tbody.appendChild(tr);
    clearForm();
}

const getRegisterById = (id, readAll) => {
    registersRef.doc(id).get()
        .then((result) => {
            register = result.data();
            vId = id;
            vName = register.name;
            vEmail = register.email;

            readAll ? appendRegister() : undefined;
        });
}

const readAllRegisters = () => {
    registersRef.onSnapshot((result) => {
        const tbody = document.querySelector('.registers__table tbody');
        tbody.innerHTML = '';

        result.forEach(doc => {
            getRegisterById(doc.id, true);
        });
    });
}

const createRegister = () => {
    registersRef.add({
        name: vName,
        email: vEmail
    })
        .then((docRef) => {
            console.log(docRef.id)
            alert('Registro adicionado!!')
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

}

const updateRegister = () => {
    registersRef.doc(vId).set({
        name: vName,
        email: vEmail
    }).then(() => {
        clearForm();
        alert("Registro atualizado!!");
    }).catch((err) => {
        console.log("Erro: " + err);
    });
}

const clickSaveButton = () => {
    readForm();
    if (vId == '') {
        createRegister();
    } else {
        updateRegister(vId);
    }
}

const deleleRegister = (id) => {
    registersRef.doc(id).delete().then(() => {
        alert('Registro deletado!!');
    }).catch((err) => {
        console.log('Erro: ' + err);
    });
}

const addEventClickButtonSave = () => {
    const button = document.querySelector('.save-register');
    button.addEventListener('click', clickSaveButton);
}

window.onload = () => {
    addEventClickButtonSave();
    readAllRegisters();
}