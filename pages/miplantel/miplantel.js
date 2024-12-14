export let dataPlayers = []; // El array compartido
export let dataTeam;
export let dataPositions;

import { renderRows  } from "./miplantelGrilla.js";
import { renderTable } from "./miplantelTable.js";


//variables del dom
const $buttonList = document.getElementById('button-list-miplantel');
const $buttonGrid = document.getElementById('button-grid-miplantel');
const $miplantelTable = document.getElementById('miplantel-table-container');
const $miplantelGrilla = document.getElementById('miplantel-grilla-container');

export const getData = async () => {
    if (dataPlayers.length === 0) { // Si no está cargado, lo obtenemos
        let response = await fetch('../../data/players.json');
        let data = await response.json();
        dataPlayers = data;

        response = await fetch('../../data/equipo.json');
        data = await response.json();
        dataTeam = data;
        console.log(dataTeam);
        

        response = await fetch('../../data/positions.json');
        data = await response.json();
        dataPositions = data;
    }
};

export const addPlayer = (player) => {
    dataPlayers.push(player); // Añadir un jugador al array
};

export const removePlayer = (playerId) => {
    
    const index = dataPlayers.findIndex((player) => player.id === playerId);
    
    //elimino jugador del arreglo de jugadores
    if (index !== -1) {
        dataPlayers.splice(index, 1); // Eliminar un jugador por ID
    }

    //elimino jugador de la lista de posiciones
    deletePlayerOfPosition(playerId);
};

export const removeMorePlayers = (ids) => {
    //elimino de dataPlayers
    dataPlayers = dataPlayers.filter((player) => !ids.includes(player.id));
    
    //elimino de dataPositions
    ids.forEach(id => deletePlayerOfPosition(id));
};

export const clearPlayers = () => {
    dataPlayers.length = 0; // Vaciar el array
};


export const changePlayerPosition = (playerId, newPositionId, newIndex) => {
    deletePlayerOfPosition(playerId);

    // Buscar la nueva posición e insertar al jugador en el índice especificado
    const newPosition = dataPositions.find(position => position.id === newPositionId);
    if (newPosition) {
        if (newIndex >= 0 && newIndex <= newPosition.players.length) {
            newPosition.players.splice(newIndex, 0, playerId); // Insertar el jugador en la nueva posición y en el índice indicado
        } else {
            console.warn(`El índice ${newIndex} está fuera de los límites para la posición con ID ${newPositionId}.`);
            newPosition.players.push(playerId); // Agregar al final si el índice no es válido
        }
    } else {
        console.error(`La posición con ID ${newPositionId} no existe.`);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await getData(); // Cargar datos al inicio

    cargarVista(); //cargo vista correspondinete (tabla o grilla)
    handleChangeViews(); //funcion para cambiar entre grilla y tabla
    loadDataTeam(); //cargo el nombre del equipo arriba en la pestania
});

export const cargarVista = () => {
    const vista = localStorage.getItem('vista-miplantel');

    if (!vista) {
        localStorage.setItem('vista-miplantel', 'table');
    }

    if (vista === 'grilla') {
        $buttonList.classList.remove('hidden');
        $buttonGrid.classList.add('hidden');
        $miplantelTable.classList.add('hidden');
        $miplantelGrilla.classList.remove('hidden');
        renderRows();

    } else {
        $buttonList.classList.add('hidden');
        $buttonGrid.classList.remove('hidden');
        $miplantelTable.classList.remove('hidden');
        $miplantelGrilla.classList.add('hidden');
    }
}

//funcion para cambiar entre grilla y tabla
const handleChangeViews = () => {


    $buttonList.addEventListener('mouseover', () => {
        $buttonList.children[0].src = '../../assets/imgs/list-green.png';

    });

    $buttonList.addEventListener('mouseout', () => {
        $buttonList.children[0].src = '../../assets/imgs/list-black.png';
    });

    $buttonGrid.addEventListener('mouseover', () => {
        $buttonGrid.children[0].src = '../../assets/imgs/grilla-green.png';
    });

    $buttonGrid.addEventListener('mouseout', () => {
        $buttonGrid.children[0].src = '../../assets/imgs/grilla-black.png';
    });

    $buttonList.addEventListener('click', () => {
        $buttonList.classList.add('hidden');
        $buttonGrid.classList.remove('hidden');
        $miplantelTable.classList.remove('hidden');
        $miplantelGrilla.classList.add('hidden');
        localStorage.setItem('vista-miplantel', 'table');
        renderTable();
    });

    $buttonGrid.addEventListener('click', () => {
        $buttonList.classList.remove('hidden');
        $buttonGrid.classList.add('hidden');
        $miplantelTable.classList.add('hidden');
        $miplantelGrilla.classList.remove('hidden');
        localStorage.setItem('vista-miplantel', 'grilla');
        renderRows();
    });
}



const loadDataTeam = () => {
    document.getElementById("name-plantel").textContent = `: ${dataTeam.name}`;
}

const deletePlayerOfPosition = (playerId) => {
    const currentPosition = dataPositions.find(position => position.players.includes(playerId));
    if (currentPosition) {
        const playerIndex = currentPosition.players.indexOf(playerId);
        if (playerIndex !== -1) {
            currentPosition.players.splice(playerIndex, 1); // Remover el jugador de la posición actual
        }
    } else {
        console.warn(`El jugador con ID ${playerId} no se encuentra en ninguna posición.`);
    }
}

