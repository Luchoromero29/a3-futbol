import { showErrorInput, removeErrorInput, showAlert, mostrarSuccessMessage } from "../../utilities/functionsUtils.js";
import { cargarVista, setCurrentPlayer, currentPlayer } from './miplantel.js';
//variables necesarias
let currentFlap;
const itemId = "player_id"

//largo maximo de inputs
const maxLengthInput = 100;

//creo o actualizo player
let isCreatePlayer;

//recupero contenedores
const $tableContainer = document.getElementById("miplantel-table-container")
const $infoPlayerContainer = document.getElementById("miplantel-infouser-container");
const $addUserContainer = document.getElementById("add-user-container");
const $grillaContainer = document.getElementById("miplantel-grilla-container");

//elementos de la foto del jugador
const $previewImg = document.getElementById('preview-img');
const $placeholderText = document.getElementById('placeholder-text');
const $editFileInput = document.querySelector("#edit-file-input");
const $spanName = document.getElementById('player-name');

//formulario de data general
const $form = document.getElementById('infoGeneral-player-form');


//Inicializo libreria summernote
$(document).ready(function () {
    $('#summernote').summernote({
        placeholder: 'Escribe aquí tus observaciones...',
        tabsize: 2,
        height: 200, // Altura del editor
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });
});

//peticion para datos del jugador
const getDataPlayer = async () => {
    const dataPLayer = await fetch("../../data/dataPlayerConValores.json")
        .then(response => response.json())
        .then(data => data);
    //me quedo con el unico elemento del array
    return dataPLayer
}

//peticion para datos del formulario
const getDataForm = async () => {
    const dataPLayer = await fetch("../../data/dataPlayerSinValores.json")
        .then(response => response.json())
        .then(data => data);
    //me quedo con el unico elemento del array
    return dataPLayer
}

//Cambio a la vista de info del jugador
$(document).on('click', '#button-show-player, #add-user-miplantel', async function (event) {

    event.preventDefault();

    //oculto las tablas y muestro el formulario
    toViewForms();
    addEvents();

    // recupero el id del jugador
    const idPlayer = $(this).attr(itemId);

    let data;

    //si hay id busco los datos, sino preparo para gargar los datos
    if (idPlayer) {
        data = await getDataPlayer();
        setCurrentPlayer(idPlayer);
        isCreatePlayer = false;
    } else {
        data = await getDataForm();
        isCreatePlayer = true;
    }

    renderFlaps(data);
    initForm(data);
})

$('#print-button').on('click', () => {
    console.log("se activo");

    printJS({
        printable: 'content-to-print',
        type: 'html',
        targetStyles: ['*'],
        css: '../../fonts/handgotb.TTF'
    });
})

//Cambio a la vista de tabla o grilla
$(document).on('click', '#miplantel-button-cancel-form', function (event) {
    //oculto forms y muestro tablas
    event.preventDefault();
    toViewList();
})

//Funcion para el tratamiento de la edicion y muestra de la imagen
document.getElementById('file-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewImg = document.getElementById('preview-img');
    const placeholderText = document.getElementById('placeholder-text');
    const editFileInput = document.querySelector("#edit-file-input");

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
            previewImg.classList.remove('hidden');
            placeholderText.classList.add('hidden');
            editFileInput.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    } else {
        previewImg.classList.add('hidden');
        placeholderText.classList.remove('hidden');
        editFileInput.classList.add('hidden');
    }
});

//Funcion de muestra de pestanias de info del jugador
const renderFlaps = (data) => {

    const flapsContainer = document.querySelector("#miplantel-flaps-container");
    flapsContainer.innerHTML = '';

    data.forEach((flap, index) => {
        const li = `            
            <li id="${flap.name}-flap" index="${index}" class="miplantel-flap flex items-center gap-2 hover:text-green group px-2 ${index === 0 ? 'miplantel-current-flap' : ''}">
                <img src="${flap.icon}" class="w-7 group-hover:hidden" />
                <img src="${flap.iconHover}" class="w-7 hidden group-hover:block" />
                <span>${flap.name}</span>
            </li>`

        flapsContainer.innerHTML += li;
    })
    currentFlap = document.querySelector('.miplantel-current-flap');
    addStylesFlap(currentFlap.children);
}

//funcion de cambio de pestanias
//es muy importante que las pestanias del back se conozca el orden en el que llegan ya que 
//deben tener el mismo orden que los content de cada pestania en miplantel_content.php
$(document).on('click', '.miplantel-flap', function (event) {

    //quito estilos a la pestania anterior
    currentFlap.classList.remove('miplantel-current-flap');
    quitStylesFlap(currentFlap.children);


    //agrego estilos al seleccionado
    const li = event.target.closest('li');
    li.classList.add('miplantel-current-flap');

    //recupero el index de la pestania
    const indexFlap = li.getAttribute('index');

    //recupero el array de contenedores de las pestania en miplantel_content.php
    let contentFlaps = document.querySelectorAll('.flap-content');

    //oculto todas y muestro solo la selecionada
    contentFlaps.forEach((content, index) => {
        content.classList.add('hidden');
        if (index == indexFlap) {
            content.classList.remove('hidden');
        }
    })

    //actualizo la pestania actual
    currentFlap = li;
    addStylesFlap(currentFlap.children);
});


//funcion para agregar estilos de pestania seleccionada
const addStylesFlap = (node) => {
    const [img, imgHover] = node;
    img.classList.add('hidden');
    imgHover.classList.remove('hidden');
}

//funcion para quitar estilos de pestania seleccionada
const quitStylesFlap = (node) => {
    const [img, imgHover] = node;
    img.classList.remove('hidden');
    imgHover.classList.add('hidden');
}

//funcion para iniciar el formulario
const initForm = (data) => {

    //valido si nombre del jugador tiene valor para el texto del boton del formulario
    if (isCreatePlayer) {
        document.getElementById('miplantel-button-save-form').textContent = "Guardar";
        resetForm(data);
    } else {
        document.getElementById('miplantel-button-save-form').textContent = "Actualizar";
        fillForm(data);
    }
    // Establecer valores por defecto en los inputs del formulario
    return;
}

function resetForm(data) {
    $form.querySelectorAll('input, textarea, select').forEach(input => {
        if (input.getAttribute('type') === 'file') {
            // Resetear campos de archivo
            $previewImg.classList.add('hidden');
            $placeholderText.classList.remove('hidden');
            $editFileInput.classList.add('hidden');
            $previewImg.src = '';
            $spanName.textContent = "";
        } else if (input.getAttribute('id') === 'summernote') {
            // Resetear Summernote
            const summernoteInstance = $('#summernote');
            summernoteInstance.summernote('code', '<p></p>');
        } else if (input.getAttribute('type') === 'checkbox') {
            // Desmarcar checkboxes
            input.checked = false;
        } else {
            // Resetear el resto de los campos
            input.value = '';
        }
    });
}



function fillForm(data) {
    $form.querySelectorAll('input, textarea, select').forEach(input => {
        const name = input.getAttribute('name');
        let idCampo = name && name.includes('_') ? name.split('_')[1] : null;

        if (idCampo) {
            let value = data[0].campos.find(campo => campo.id == idCampo).value;

            //para imagenes del formulario
            if (input.getAttribute('type') == 'file') {
                if (value.length > 0) {
                    $spanName.textContent = data[0].campos.find(campo => campo.id == 1).value; // Establece el nombre del jugador en el span
                    $previewImg.classList.remove('hidden');
                    $placeholderText.classList.add('hidden');
                    $editFileInput.classList.remove('hidden');
                    $previewImg.src = value;
                } else {
                    $previewImg.classList.add('hidden');
                    $placeholderText.classList.remove('hidden');
                    $editFileInput.classList.add('hidden');
                    $spanName.textContent = ""
                }

                //para el textarea de summernote
            } else if (input.getAttribute('id') == 'summernote') {
                const summernoteInstance = $('#summernote');
                summernoteInstance.summernote('code', `<p>${value}</p>`)

                //para los checkbox
            } else if (input.getAttribute('type') == "checkbox") {
                input.checked = value  // Ajusta según el valor esperado

            } else if (input.id === 'input-age-player') {
                let birthDate = $form.querySelector('#input-birthdate-player').value;
                input.value = calcularEdad(birthDate);

                //para el resto de campos
            } else {
                input.value = value;
            }
        }
    })
}

$('#input-birthdate-player').on('change', function () {
    let birthDate = $(this).val();
    $('#input-age-player').val(calcularEdad(birthDate));
})


const calcularEdad = (fecha) => {
    let hoy = new Date();
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}



//oculto tablas muestro forms
const toViewForms = () => {
    $tableContainer.classList.add('hidden');
    $infoPlayerContainer.classList.remove('hidden');
    $addUserContainer.classList.add('hidden');
    $grillaContainer.classList.add('hidden');
}

//oculto forms muestro tablas
const toViewList = () => {

    $tableContainer.classList.remove('hidden');
    $infoPlayerContainer.classList.add('hidden');
    $addUserContainer.classList.remove('hidden');
    cargarVista();
}

//Agrego eventos una vez que estamos en la pestania del form
const addEvents = () => {

    const $inputPlayerName = document.querySelector("#player-name-input");
    const $spanPlayerName = document.getElementById('player-name');
    const $inputPlayerPosition = document.getElementById('player-position-input');
    const $inputsString = Array.from(document.querySelectorAll('input[type="text"], .input-45'));

    //actualizo el nombre del jugador debajo de la foto
    $inputPlayerName.addEventListener('input', function () {
        $spanPlayerName.textContent = $inputPlayerName.value; // Actualiza el texto del span con el valor del input
    });


    //muestro que no puede ser tan largo el nombre
    $inputsString.forEach(input => {
        input.addEventListener('input', function () {

            if (input.value.length > maxLengthInput) {
                input.value = input.value.substring(0, maxLengthInput);
                showErrorInput($form, input.name)
                showAlert(`El texto no puede superar los ${maxLengthInput} caracteres`)
            } else {
                removeErrorInput($form, input.name)
            }
        })
    })

    //quito estilos de error de position 
    $inputPlayerPosition.addEventListener('input', function () {
        removeErrorInput($form, "name_2");
    })
}


//funcion de envio de formulario
$('#miplantel-button-save-form').on('click', function (e) {
    e.preventDefault();

    const formData = new FormData($form);
    let entries = Object.fromEntries(formData.entries());
    //hago que entries sea un array


    //valido que haya posicion ff
    if (entries["name_2"] === "") {
        showErrorInput($form, "name_2")
        showAlert("Debes completar todos los campos obligatorios (*)")
        return;
    }

    console.log(entries);
    if (isCreatePlayer) {
        mostrarSuccessMessage(`Jugador ${entries["name_1"]} creado con éxito`)
    } else {
        mostrarSuccessMessage(`Jugador ${entries["name_1"]} actualizado con éxito`)
    }
    toViewList();
});







