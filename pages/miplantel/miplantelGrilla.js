import { dataPlayers, dataPositions, changePlayerPosition, removePlayer, deletePosition, addPosition, changeNamePosition } from './miplantel.js';
import { mostrarSuccessMessage, extractNumberFromString } from '../../utilities/functionsUtils.js';
import { showModal } from '../../utilities/modalDelete/modalDelete.js';

//variables necesarias
const itemId = "player_id" //este es el nombre que lleva el data en las etiquetas para tener el id

const $rowSinAsignarContainer = document.getElementById('miplantel-row-sinasignar-grilla');
const $rowSinAsignarDropzone = $rowSinAsignarContainer.querySelector('.dropzone');
const $rowSinAsignarCount = $rowSinAsignarContainer.querySelector('#miplantel-sinasignar-count');
const $rowSinAsignarDivider = $rowSinAsignarContainer.querySelector('#miplantel-row-sinasignar-divider');
const $rowSinAsignarOptions = $rowSinAsignarContainer.querySelector('#miplantel-sinasignar-row-options');



const $carousel = document.querySelector('.carousel');
const $leftButton = document.querySelector('#miplantel-carousel-left-button');
const $rightButton = document.querySelector('#miplantel-carousel-right-button');

const CARD_WIDTH = 130;
const CARD_GAP = 16

document.addEventListener('DOMContentLoaded', () => {

    //cargo eventos del carousel
    handleCarousel();

    //eventos de la fila sin asignar
    $rowSinAsignarContainer.addEventListener('mouseover', () => {
        $rowSinAsignarDivider.classList.remove('bg-gray-bg');
        $rowSinAsignarDivider.classList.add('bg-green');
        if (dataPositions.length == 0) {
            $rowSinAsignarOptions.classList.remove('hidden');
        }
    })
    
    $rowSinAsignarContainer.addEventListener('mouseout', () => {
        $rowSinAsignarDivider.classList.add('bg-gray-bg');
        $rowSinAsignarDivider.classList.remove('bg-green');
        $rowSinAsignarOptions.classList.add('hidden');
    })
    
    const $iconAddFirstRow = $rowSinAsignarContainer.querySelector('#miplantel-icon-add-first-row');
    $iconAddFirstRow.addEventListener('click', () => {
        addRowGrilla(0);
    })
})




//acciones al cargar
let originDropzone = null; // Variable global para almacenar la dropzone origen

export const setEventDragAndDrop = () => {
    document.querySelectorAll('.draggable').forEach(item => {
        // Evento dragstart
        item.addEventListener('dragstart', (e) => {
            const draggable = e.target.closest('.draggable');
            e.dataTransfer.setData('text/plain', draggable.id);
            draggable.classList.add('dragging-miplantel');

            // Guarda la dropzone de origen
            originDropzone = draggable.closest('.dropzone');
        });

        // Mostrar y ocultar labels en hover
        item.addEventListener('mouseover', () => {
            item.querySelector('#miplantel-label-position-grilla').classList.remove('hidden');
        });
        item.addEventListener('mouseout', () => {
            item.querySelector('#miplantel-label-position-grilla').classList.add('hidden');
        });

        // Evento dragend
        item.addEventListener('dragend', (e) => {
            const draggable = e.target.closest('.draggable');
            draggable.classList.remove('dragging-miplantel');
        });
    });

    // Manejo de dropzones
    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.addEventListener('dragover', (e) => e.preventDefault());

        zone.addEventListener('drop', (e) => {
            e.preventDefault();

            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);
            const dropzone = e.target.closest('.dropzone');
            const rowContainer = dropzone.closest("#miplantel-row-grilla")

            if (draggable && dropzone) {
                const children = Array.from(dropzone.children);
                const currentIndex = children.indexOf(draggable);

                const dropTarget = e.target.closest('.draggable');
                const dropIndex = dropTarget ? children.indexOf(dropTarget) : children.length;

                if (currentIndex === dropIndex) return; // Si se suelta en el mismo lugar, no hace nada

                // Actualizo las clases según la nueva dropzone
                if (dropzone.classList.contains('row-not-asigned')) {
                    draggable.classList.remove('asigned');
                    draggable.classList.add('not-asigned');
                } else {
                    draggable.classList.add('asigned');
                    draggable.classList.remove('not-asigned');
                }

                // Actualizo el array de posiciones
                let playerId = extractNumberFromString(id);
                let positionId = extractNumberFromString(dropzone.id);


                //actualizo los estilos de la row
                if (positionId == 0) {
                    if ($rowSinAsignarDropzone.children.length == 0) {
                        $rowSinAsignarContainer.classList.remove('empty');
                    }
                } else {
                    if (children.length == 0) {
                        rowContainer.classList.remove('empty');
                    }
                }

                if (originDropzone && !originDropzone.closest('#miplantel-row-sinasignar-grilla')) {
                    const originRowContainer = originDropzone.closest('#miplantel-row-grilla');
                    if (originDropzone.children.length == 1) {
                        originRowContainer.classList.add('empty');
                    }
                } else {
                    console.log("lo cumplio");
                    if ($rowSinAsignarDropzone.children.length == 1) {
                        $rowSinAsignarContainer.classList.add('empty');
                    }
                }

                changePlayerPosition(playerId, positionId, dropIndex);

                // Reorganizo los elementos en la nueva dropzone
                if (currentIndex !== -1) children.splice(currentIndex, 1);
                children.splice(dropIndex, 0, draggable);
                dropzone.innerHTML = '';
                children.forEach(child => dropzone.appendChild(child));

                // Actualizo contador de la dropzone de destino
                if (positionId == 0) {
                    $rowSinAsignarCount.innerHTML = `(${dropzone.children.length})`;
                } else {
                    const newRowCount = dropzone.closest('#miplantel-row-grilla').querySelector('#miplantel-row-count');
                    newRowCount.innerHTML = `(${dropzone.children.length})`;
                }

                // Actualizo contador de la dropzone de origen
                if (originDropzone && !originDropzone.closest('#miplantel-row-sinasignar-grilla')) {
                    const originRowCount = originDropzone.closest('#miplantel-row-grilla').querySelector('#miplantel-row-count');
                    originRowCount.innerHTML = `(${originDropzone.children.length})`;
                } else {
                    $rowSinAsignarCount.innerHTML = `(${originDropzone.children.length})`;
                }

                // Limpio la referencia de origen
                originDropzone = null;

                // Actualizo los botones del carousel
                updateButtonVisibility();
            }
        });
    });
};



//renderizamos los jugadores en la grilla
export const renderRows = async () => {



    const rowsContainer = document.querySelector('#container-rows-miplantel-grilla');
    rowsContainer.innerHTML = '';

    let playersAsigned = [];

    dataPositions.forEach((position) => {

        //verifico si tiene players o esta vacio
        let isEmpty = '';

        if (position.players.length == 0) {
            isEmpty = 'empty';
        }

        //creo cada fila de la grilla
        const row = rowOfGrilla(position, isEmpty);
        rowsContainer.innerHTML += row;

        const dropzone = document.getElementById("zone" + (position.id));
        dropzone.innerHTML = '';

        position.players.forEach((idPlayer) => {
            playersAsigned.push(idPlayer);

            //recupero el jugador
            const player = dataPlayers.find(player => player.id === idPlayer);

            //creo la carta para aniadir al DOM
            const card = cardPlayer(player, 'asigned')

            dropzone.innerHTML += card
        })
    })

    //agrego los jugadores que no estan en ninguna position
    const playersNotAssigned = dataPlayers.filter(player => !playersAsigned.includes(player.id));

    //verifico si tenemos jugadores sin asignar
    if (playersNotAssigned.length == 0) {
        $rowSinAsignarContainer.classList.add('empty');
    }

    $rowSinAsignarDropzone.innerHTML = '';

    playersNotAssigned.forEach((player) => {
        $rowSinAsignarDropzone.innerHTML += cardPlayer(player, 'not-asigned');
    })

    $rowSinAsignarCount.innerHTML = `(${$rowSinAsignarDropzone.children.length})`;


    setEventDragAndDrop();
    addEventsRowsGrilla();
    updateButtonVisibility();
}

//funcion para eliminar jugador
$(document).on('click', '#miplantel-card-grilla-close', function (e) {

    console.log("eliminando");

    const idPlayer = $(this).data('player_id');

    showModal(
        `Deseas eliminar a tu jugador?`,   // Título
        "Si",                        // Texto del botón Confirmar
        "No",                       // Texto del botón Cancelar
        () => { handleDeletePlayer(idPlayer); },  // Callback de Confirmar
        () => { } // Callback de Cancelar
    )

    const handleDeletePlayer = (id) => {

        const player = dataPlayers.find(player => player.id == id);
        removePlayer(id);
        console.log(dataPlayers);

        //renderizo de nuevo las filas
        renderRows();

        //informo la eliminacion del jugador
        mostrarSuccessMessage(`Jugador ${player.name} eliminado correctamente`);
    }
})

const addEventsRowsGrilla = () => {
    let rows = document.querySelectorAll('#miplantel-row-grilla');

    //eventos de las filas con posicion asignada
    rows.forEach(row => {

        //eventos de estilos
        const $iconAddRow = row.querySelector('#miplantel-icon-add-row');
        const $iconEditRow = row.querySelector('#miplantel-icon-edit-row');
        const $iconDeleteRow = row.querySelector('#miplantel-icon-delete-row');
        const $divider = row.querySelector('#miplantel-row-divider');
        const $rowOptions = row.querySelector('#miplantel-row-options');

        const $dropzone = row.querySelector('.dropzone');
        const positionId = extractNumberFromString($dropzone.id);


        $iconAddRow.addEventListener('mouseover', () => {
            $iconAddRow.src = '../../assets/imgs/plus-green.png';
        })
        $iconAddRow.addEventListener('mouseout', () => {
            $iconAddRow.src = '../../assets/imgs/plus-black.png';
        })
        $iconEditRow.addEventListener('mouseover', () => {
            $iconEditRow.src = '../../assets/imgs/13 lapiz.png';
        })
        $iconEditRow.addEventListener('mouseout', () => {
            $iconEditRow.src = '../../assets/imgs/pencil-black.png';
        })

        $iconDeleteRow.addEventListener('mouseover', () => {
            $iconDeleteRow.src = '../../assets/imgs/17 eliminar.png';
        })
        $iconDeleteRow.addEventListener('mouseout', () => {
            $iconDeleteRow.src = '../../assets/imgs/delete-black.png';
        })

        row.addEventListener('mouseover', (e) => {
            $divider.classList.remove('bg-gray-bg');
            $divider.classList.add('bg-green');
            $rowOptions.classList.remove('hidden');
        })

        row.addEventListener('mouseout', (e) => {
            $divider.classList.add('bg-gray-bg');
            $divider.classList.remove('bg-green');
            $rowOptions.classList.add('hidden');
        })

        //eventos de accion
        $iconDeleteRow.addEventListener('click', () => {

            const dropzone = row.querySelector('.dropzone');

            if (dropzone.children.length == 0) {
                removeRowGrilla(positionId);
            } else {
                //Mostrar modal
                showModal(
                    `Al eliminar la fila, los jugadores volverán a la lista "Sin asignar"`,   // Título
                    "Si",                        // Texto del botón Confirmar
                    "No",                       // Texto del botón Cancelar
                    () => { removeRowGrilla(positionId) },  // Callback de Confirmar
                    () => { } // Callback de Cancelar
                )
            }

        })


        $iconAddRow.addEventListener('click', () => {
            addRowGrilla(positionId);
        })

        $iconEditRow.addEventListener('click', () => {
            editRowGrilla(row, positionId);
        })
    })

    

}

const rowOfGrilla = (position, empty) => {
    return `
            <div id="miplantel-row-grilla" class="text-dark-gray-bg w-full flex flex-col hover:text-green ${empty}">
                <header class="header-row-grilla h-[30px] flex gap-2 items-center justify-center w-full">
                    <div class="flex gap-1 text-nowrap flex-nowrap  items-center">
                        <label>
                            <p id="miplantel-row-name">${position.name}</p>
                            <input id="miplantel-input-name-position" value="${position.name}" class=" focus:outline-none bg-transparent w-[150px] caret-green hidden" type="text"  ></input>
                        </label>
                        <p id="miplantel-row-count">(${position.players.length})</p>
                        <div id="miplantel-row-options" class="hidden border-[1px] w-[100px] border-dark-gray-bg bg-white flex items-center justify-between gap-3 p-1 rounded-md">
                            <div>
                                <img id="miplantel-icon-add-row" class="w-4"  src="../../assets/imgs/plus-black.png"/>
                            </div>
                            <div>
                                <img id="miplantel-icon-edit-row" class="w-4" src="../../assets/imgs/pencil-black.png"/>
                            </div>
                            <div>
                                <img id="miplantel-icon-delete-row" class="w-4" src="../../assets/imgs/delete-black.png"/>
                            </div>
                        </div>
                    </div>
                    <div id="miplantel-row-divider" class="w-full h-[2px] bg-dark-gray-bg"></div>
                </header>
                <main>
                    <div class="dropzone flex items-center min-h-[60px] gap-4 py-4 row-asigned" id="${"zone" + (position.id)}">
                        
                    </div>
                </main>
            </div>`
}




const cardPlayer = (player, isAsigned) => {
    return `
                <div id="${"item" + (player.id)}" draggable="true" class="draggable relative flex p-1 gap-2 max-w-[${CARD_WIDTH}px] min-w-[${CARD_WIDTH}px] flex-col items-center  ${isAsigned}
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
                    <span class="text-center text-nowrap">${player.name}</span>
                    <div>
                        <a href="" id="button-show-player" data-${itemId}='${JSON.stringify(player.id)}'>
                            <div class="icon-to-info-player w-5 h-5 bg-center bg-contain"></div>
                        </a>
                    </div>
                </div>
            `
}


//funcion para agregar fila a la grilla

const addRowGrilla = (positionId) => {
    const newId = addPosition("ESCRIBIR NOMBRE", positionId)
    renderRows();

    //recupero la row creada
    const dropzone = document.getElementById("zone" + newId);
    const rowContainer = dropzone.closest('#miplantel-row-grilla');

    //agrego estilos de creada
    rowContainer.classList.add('created');
    setTimeout(() => {
        rowContainer.classList.remove('created');
    }, 2000);
}

//editar nombre de la grilla
const editRowGrilla = (row, positionId) => {
    const $inputName = row.querySelector('#miplantel-input-name-position');
    const $labelName = row.querySelector('#miplantel-row-name');

    $inputName.classList.remove("hidden");
    $labelName.classList.add("hidden");

    $inputName.focus();

    $inputName.addEventListener('blur', () => {
        $inputName.classList.add("hidden");
        $labelName.classList.remove("hidden");

        if ($inputName.value.trim() === '') {
            return
        }

        $labelName.textContent = $inputName.value;
        const name = $inputName.value;

        changeNamePosition(name, positionId);
        // Ocultar el input y mostrar la etiqueta
    });
}

//funcion de eliminar fila de la grilla
const removeRowGrilla = (id) => {
    deletePosition(id);
    renderRows();
}
//funcion para mostrar botones del carousel
const updateButtonVisibility = () => {
    const cantCards = $rowSinAsignarDropzone.children.length;
    const carouselWidth = $carousel.offsetWidth;

    const widthAllCards = cantCards * CARD_WIDTH + (cantCards - 1) * CARD_GAP;

    if (widthAllCards > carouselWidth) {
        $leftButton.style.display = 'block'
        $rightButton.style.display = 'block'
    } else {
        $leftButton.style.display = 'none'
        $rightButton.style.display = 'none'
    }
};

//funcion para agregar eventos del carousel
const handleCarousel = () => {
    if ($carousel) {
        // Eventos para mover el carrusel
        $leftButton.addEventListener('click', () => {
            $carousel.scrollLeft -= CARD_WIDTH;
        });

        $rightButton.addEventListener('click', () => {
            $carousel.scrollLeft += CARD_WIDTH;
        });

        // Actualizar visibilidad al hacer scroll o redimensionar
        window.addEventListener('resize', updateButtonVisibility);
        // Inicializar visibilidad
    }
}





