import { extractNumberFromString } from "../../utilities/functionsUtils.js";
import { currentPlayer, dataTeams, setCurrentPlayer } from "./miplantel.js";

let idTeamCheck;
const itemId = "player_id"

const $modalTransferencia = document.querySelector("#miplantel-trasnferencia-container");
const $labelContainer = document.querySelector("#label-container-modal-transferencia");

let $checkBoxButton; 
document.addEventListener('DOMContentLoaded', () => {

    //agregamos funcionalidad de cierre de modal

})

$(document).on('click', '.miplantel-button-trasnferencia', function () {
    const playerId = $(this).attr(itemId);

    if (playerId) {
        setCurrentPlayer(playerId);
    }

    loadLabelsModal();
    addEventsLabel();

    $modalTransferencia.classList.remove('hidden');

})

const labelCheckBox = (team) => {
    return `
    <label for="transferenciaCaja" class="rounded-md flex gap-2 items-center px-2 py-1 w-[84%] hover:bg-gray-bg duration-150" id="team${team.id}">
        <div class="flex gap-2 items-center">
            <button  class="select-button-trasnferencia overflow-hidden relative w-5 h-5 border-2 
            border-gray-300 rounded-full hover:border-green focus:outline-none transition-all overflow-hidden">
                <img id="select-button-icon" src="../../assets/imgs/3.png" alt=""
                class="hidden w-[24px] h-[24px] object-cover absolute top-[-3px] left-[0px]" />
            </button>
        </div>
        <div class="flex gap-3 items-center">
            <img src="${team.escudo}" class="w-8" alt="">
            <p>a ${team.nombre}</p>
        </div>
    </label>
 `
}

const addEventsLabel = () => {
    $checkBoxButton = document.querySelectorAll('.select-button-trasnferencia')
    //agrego evento de check
    $checkBoxButton.forEach(checkBox => {
        checkBox.addEventListener('click', () => {
            const $imgCheckBox = checkBox.querySelector('#select-button-icon')
            $imgCheckBox.classList.toggle('hidden')
            checkBox.classList.toggle('checkbox-selected')

            //busco el label del checkbox
            let $labelCheckBox = checkBox.closest('label');

            //si fue seleccionado 
            if (checkBox.classList.contains('checkbox-selected')) {
                idTeamCheck = extractNumberFromString($labelCheckBox.id);
            } else {
                idTeamCheck = null;
            }

            deselectAllButton(checkBox);
        })
    })

    
}

//deseleccionamos todas las checkboxes menos la que pasamos por parametro
const deselectAllButton = (checkBoxCheck = "") => {
    $checkBoxButton.forEach(checkBox => {
        if (checkBox != checkBoxCheck) {
            checkBox.classList.remove('checkbox-selected')
            const $imgCheckBox = checkBox.querySelector('#select-button-icon')
            $imgCheckBox.classList.add('hidden')
        }
    })
}

const ageCalulator =() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const birthDate = new Date(currentPlayer.fecha_nacimiento);
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    let age = year - birthYear;
    let ageMonth = month - birthMonth;
    let ageDay = day - birthDay;

    if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
        age = age - 1;
    }
    return age;
}


//close modal cuando se toca fuera 
$('#modal-trasnferencia-container').on('click', function (e) {
    if (e.target === this) {
        $('#miplantel-trasnferencia-container').addClass('hidden');
    }
})

//close modal desde la cruz
$('#close-modal-transferencia').on('click', () => {
    $('#miplantel-trasnferencia-container').addClass('hidden');
})

//cancelar la trasnferencia
$('#button-cancel-trasnferencia').on('click', () => {
    $('#miplantel-trasnferencia-container').addClass('hidden');
})

//confirmar la trasnferencia
$('#button-confirm-trasnferencia').on('click', () => {
    
    const team = dataTeams.find(team => team.id == idTeamCheck);

    console.log("Transferencia realizada con exito");
    console.log("Jugador trasnferido: ", currentPlayer);
    console.log("Equipo destino: ", team);
    
    $('#miplantel-trasnferencia-container').addClass('hidden');
    deselectAllButton();

})



const loadLabelsModal = () => {
    dataTeams.forEach(team => {
        $labelContainer.innerHTML += labelCheckBox(team);
    })
}

