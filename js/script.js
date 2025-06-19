// Declaracion de constantes

const steps = document.querySelectorAll(".zona");
const errorMessagediv = document.getElementById("errorMessages");
const currentStepdiv = document.querySelector(".currentStep");
const form = document.getElementById("formularioAplicacion");

// campos de la zona 1
const nombre = document.getElementById("nombre");
const apellido1 = document.getElementById("apellido1");
const apellido2 = document.getElementById("apellido2");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const nif = document.getElementById("nif");

// campos de la zona 2
const profesion = document.getElementById("profesion");
const salario = document.getElementById('salario');
const movilidad = document.getElementById("movilidad");


// campos de la zona 3
const presentacion = document.getElementById("presentacion");


// variables de estado
let currentStep = 1;
let errorMsg = [];


// avanzar al siguiente paso
function nextStep() {
    errorMsg = [];
    errorMessagediv.innerText = "";

    //validar campos especificos segun el paso actual
    switch (currentStep) {
        case 1:
            zona1Errors(nombre, apellido1, apellido2, email, telefono, nif);
            validateStep(errorMsg);
            break;
        case 2:
            zona2Errors(profesion, salario, movilidad);
            validateStep(errorMsg);
            break;
        case 3:
            validateStep(errorMsg);
            break;
    }

}
// retroceder al paso anterior
function previousStep() {
    errorMessagediv.innerText = "";
    showStep(currentStep - 1);
}

//actualizar la vista de los pasos y guardar estado
function showStep(step) {
    steps.forEach((el, index) => {
        el.hidden = index + 1 !== step;
    });
    currentStep = step;
    // currentStepdiv.innerText = currentStep;
    localStorage.setItem('storedStep', currentStep);

}


//validar campos y añadir mensajes de error
function zona1Errors(field1, field2, field3, field4, field5, field6 = undefined) {
    const getErrorMsg = (field) => `Introduce un ${document.querySelector(`label[for="${field.id}"]`).textContent} valido`;

    if (!field1.checkValidity()) errorMsg.push(getErrorMsg(field1));
    if (!field2.checkValidity()) errorMsg.push(getErrorMsg(field2));
    if (!field3.checkValidity()) errorMsg.push(getErrorMsg(field3));
    if (!field4.checkValidity()) errorMsg.push(getErrorMsg(field4));
    if (!field5.checkValidity()) errorMsg.push(getErrorMsg(field5));
    if (!field6.checkValidity()) errorMsg.push(getErrorMsg(field6));

    if (errorMsg.length > 0) {
        errorMessagediv.innerText = errorMsg.join('\n');
    }

    console.log(errorMsg);
}

function zona2Errors(field1, field2, field3 = undefined) {
    const getErrorMsg = (field) => `Introduce un ${document.querySelector(`label[for="${field.id}"]`).textContent} valido`;
    let check = document.querySelector('input[name="salario"]:checked');


    if (field1 && !field1.checkValidity()) errorMsg.push(getErrorMsg(field1));
    if (field3 && !field3.checkValidity()) errorMsg.push(getErrorMsg(field3));

    if (errorMsg.length > 0) {
        errorMessagediv.innerText = errorMsg.join('\n');
    }

    console.log(errorMsg);
}

function zona3Errors(field1 = undefined) {
    const getErrorMsg = (field) => `Introduce un ${document.querySelector(`label[for="${field.id}"]`).textContent} valido`;

    if (field1.value == "" || field1.value == null ) errorMsg.push(getErrorMsg(field1));

    if (errorMsg.length > 0) {
        errorMessagediv.innerText = errorMsg.join('\n');
    }

    console.log(errorMsg);
}

function validateStep(errorMsg) {
    if (errorMsg.length === 0) {
        showStep(currentStep + 1);
    }
}

// guardar los datos en localStorage
form.addEventListener("input", () => {

    const formdata = {
        nombre: nombre.value,
        email: email.value,
        apellido1: apellido1.value,
        apellido2: apellido2.value,
        telefono: telefono.value,
        nif: nif.value,
        profesion: profesion.value,
        salario: salario.value,
        movilidad: movilidad.value,
        presentacion: presentacion.value

    }
    localStorage.setItem("formdata", JSON.stringify(formdata));
});

form.addEventListener("submit", () => {
    localStorage.removeItem("formdata");
    localStorage.removeItem("storedStep");
});


