//Inicializo libreria summernote

let currentFlap;

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

const getDataPlayer = async (idPlayer) => {
    const dataPLayer = await fetch("../../data/dataPlayerConValores.json")
        .then(response => response.json())
        .then(data => data);
    //me quedo con el unico elemento del array
    return dataPLayer
}

const getDataForm = async () => {
    const dataPLayer = await fetch("../../data/dataPlayerSinValores.json")
        .then(response => response.json())
        .then(data => data);
    //me quedo con el unico elemento del array
    return dataPLayer
}

//Cambio a la vista de info del jugador
$(document).on('click', '#button-show-player, #add-user-miplantel', async function () {
    document.getElementById("miplantel-table-container").classList.add('hidden');
    document.getElementById("miplantel-infouser-container").classList.remove('hidden');

    const idPlayer = $(this).data('player_id');
    console.log(idPlayer);
    let data;
    if (idPlayer) {
        data = await getDataPlayer(idPlayer);
    } else {
        data = await getDataForm();

    }
    renderFlaps(data);
    initForm();
})

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

const fillForm = (player) => {



}

const renderFlaps = (data) => {
    const flapsContainer = document.querySelector("#miplantel-flaps-container");

    data.forEach((flap, index) => {
      
        const li = `            
            <li class="flex items-center gap-2 hover:text-green group px-2 ${index === 0 ? 'miplantel-current-flap' : ''}" onclick="toggleFlap(event)">
                <img src="${flap.icon}" class="w-7 group-hover:hidden" />
                <img src="${flap.iconHover}" class="w-7 hidden group-hover:block" />
                <span>${flap.name}</span>
            </li>`

        flapsContainer.innerHTML += li;

        // const newLi = document.createElement('div'); // Crea un contenedor temporal
        // newLi.innerHTML = li2;
    })

}

// let currentFlap = document.querySelector('.miplantel-current-flap');
    
// const toggleFlap = (event) => {
    
//     //saco estilos actuales de seleccionado
//     currentFlap.classList.remove('miplantel-current-flap');
//     quitStylesFlap(currentFlap.children);


//     //agrego estilos al seleccionado
//     const li = event.target.closest('li');
//     li.classList.add('miplantel-current-flap');
//     currentFlap = li;
//     addStylesFlap(currentFlap.children);
// }

// const addStylesFlap = (node) => {        
//     const [img, imgHover] = node;
//     img.classList.add('hidden');
//     imgHover.classList.remove('hidden');
// }
// const quitStylesFlap = (node) => {        
//     const [img, imgHover] = node;
//     img.classList.remove('hidden');
//     imgHover.classList.add('hidden');
// }


// document.addEventListener("DOMContentLoaded", () => {
//    addStylesFlap(currentFlap.children);
// });