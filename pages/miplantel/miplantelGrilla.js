import { getData, dataPlayers, dataPositions, changePlayerPosition, removePlayer } from './miplantel.js';
import { mostrarSuccessMessage, ocultarSuccessMessage } from '../../utilities/functionsUtils.js';
//variables necesarias
const itemId = "player_id"


//acciones al cargar


export const setEventDragAndDrop = () => {

    document.querySelectorAll('.draggable').forEach(item => {
        
        item.addEventListener('dragstart', (e) => {

            const draggable = e.target.closest('.draggable');
            e.dataTransfer.setData('text/plain', draggable.id);

            draggable.classList.add('dragging-miplantel');

        });

        item.addEventListener('mouseover', (e) => {


            item.querySelector('#miplantel-label-position-grilla').classList.remove('hidden');
        })

        item.addEventListener('mouseout', (e) => {


            item.querySelector('#miplantel-label-position-grilla').classList.add('hidden');
        })

        item.addEventListener('dragend', (e) => {


            const draggable = e.target.closest('.draggable');
            draggable.classList.remove('dragging-miplantel');
        });

    });

    // Handle drop events
    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();

            const id = e.dataTransfer.getData('text/plain');

            const draggable = document.getElementById(id);
            const dropzone = e.target.closest('.dropzone');

            if (draggable && dropzone) {
                const children = Array.from(dropzone.children);
                const currentIndex = children.indexOf(draggable);

                // Get the position where the item was dropped
                const dropTarget = e.target.closest('.draggable');
                const dropIndex = dropTarget ? children.indexOf(dropTarget) : children.length;


                // If dropped in the same place, do nothing
                if (currentIndex === dropIndex) {
                    return;
                }

                // agrego o quito el asigned segun la fila correspondinete
                if (dropzone.classList.contains('row-not-asigned')) {
                    draggable.classList.remove('asigned');
                    draggable.classList.add('not-asigned');
                } else {
                    draggable.classList.add('asigned');
                    draggable.classList.remove('not-asigned');
                }

                //actualizo el array de posiciones
                let playerId = extractNumberFromString(id);
                let positionId = extractNumberFromString(dropzone.id);

                //llamo a la funcion encargada del cambio de posiciones
                changePlayerPosition(playerId, positionId, dropIndex);

                console.log(dataPositions);


                // Remove the item and reinsert it at the new index
                if (currentIndex !== -1) {
                    children.splice(currentIndex, 1);
                }
                children.splice(dropIndex, 0, draggable);

                // Clear the dropzone and reappend all items in the correct order
                dropzone.innerHTML = '';
                children.forEach(child => dropzone.appendChild(child));
            }
        });
    });
}


//renderizamos los jugadores en la grilla
export const renderRows = async () => {

    const rowsContainer = document.querySelector('#container-rows-miplantel-grilla');
    rowsContainer.innerHTML = '';

    dataPositions.forEach((position, index) => {

        //distingo si es la seccion de sin asignar o no, la coloco siempre al final
        let isAsigned = index !== (dataPositions.length - 1) ? 'asigned' : 'not-asigned';
        let isRowAsigned = index !== (dataPositions.length - 1) ? 'row-asigned' : 'row-not-asigned';

        //creo cada fila de la grilla
        const row = `
            <div class="w-full flex flex-col">
                <header class="flex gap-2 items-center justify-center w-full">
                    <div class="flex text-gray-bg gap-1 text-nowrap">
                        <p>${position.name}</p>
                        <p>(${position.players.length})</p>
                    </div>
                    <div class="w-full h-[2px] bg-gray-bg"></div>
                </header>
                <main>
                    <div class="dropzone flex items-center h-[220px] gap-4 ${isRowAsigned}" id="${"zone" + (position.id)}">
                        
                    </div>
                </main>
            </div>`
        rowsContainer.innerHTML += row;

        const dropzone = document.getElementById("zone" + (position.id));
        dropzone.innerHTML = '';

        position.players.forEach((idPlayer) => {

            const player = dataPlayers.find(player => player.id === idPlayer);

            const card = `
                <div id="${"item" + (player.id)}" draggable="true" class="draggable relative flex p-1 gap-2 flex-col items-center ${isAsigned} 
                    duration-150 rounded-lg cursor-pointer">
                    <div id="miplantel-card-grilla-close" data-${itemId}='${JSON.stringify(player.id)}' class="absolute top-[-8px] right-[-8px] z-30 rounded-full h-5 w-5 
                        flex items-center justify-center overflow-hidden  duration-150">
                        <img src="../../assets/imgs/close-white.png" class="w-5 h-5 object-cover" />
                    </div>
                    <div class="flex items-center justify-center rounded-t-md w-full h-[120px] relative">
                        <img src="${player.avatar}" alt="player"
                        class="w-full h-full object-contain rounded-t-sm">
                        <div id="miplantel-label-position-grilla"
                        class="hidden absolute bottom-0 bg-black/30 flex items-center justify-center w-full">
                            <p class="text-white text-sm">${player.position}</p>
                        </div>
                    </div>
                    <span class="text-center">${player.name}</span>
                    <div>
                        <a href="" id="button-show-player" data-${itemId}='${JSON.stringify(player.id)}'>
                            <div class="icon-to-info-player w-5 h-5 bg-center bg-contain"></div>
                        </a>
                    </div>
                </div>
            `
            dropzone.innerHTML += card

        })
    })

    setEventDragAndDrop();
}

//funcion para eliminar jugador
$(document).on('click', '#miplantel-card-grilla-close', function (e) {

    console.log("eliminando");
    
    const idPlayer = $(this).data('player_id');

    //Mostrar modal
    $('#deleteModal').removeClass('hidden');

    //si cancela
    $('#cancelDelete').off('click').on('click', function () {
        $('#deleteModal').addClass('hidden');
    });

    //si confirma
    $('#confirmDelete').off('click').on('click', function () {
        console.log("Eliminando usuarios con IDs:", idPlayer);

        // Eliminar la fila de la tabla
        const player = dataPlayers.find( player => player.id == idPlayer);
        removePlayer(idPlayer);
        console.log(dataPlayers);

        //renderizo de nuevo las filas
        renderRows();

        //encuentro el jugador eliminado
        console.log(dataPlayers);
        
        console.log(player);
        
        //Ocultar modal
        $('#deleteModal').addClass('hidden');

        mostrarSuccessMessage(`Usuario ${player.name} eliminado correctamente`);
    });

})

//Funciones de utilidad para el codigo

const extractNumberFromString = (str) => {
    const match = str.match(/\d+/); // Busca cualquier grupo de dígitos en la cadena
    return match ? parseInt(match[0], 10) : null; // Convierte el resultado a número o retorna null si no hay coincidencia
};