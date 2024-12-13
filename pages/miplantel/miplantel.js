export let dataPlayers = []; // El array compartido
export let dataTeam;
export let dataPositions; 



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
    if (index !== -1) {
        dataPlayers.splice(index, 1); // Eliminar un jugador por ID
    }
};

export const removeMorePlayers = (ids) => {
    dataPlayers = dataPlayers.filter((player) => !ids.includes(player.id));
};

export const clearPlayers = () => {
    dataPlayers.length = 0; // Vaciar el array
};

document.addEventListener("DOMContentLoaded", async () => {
    await getData(); // Cargar datos al inicio
    
    cargarVista(); //cargo vista correspondinete (tabla o grilla)
    handleChangeViews(); //funcion para cambiar entre grilla y tabla
    loadDataTeam(); //cargo el nombre del equipo arriba en la pestania
    
    console.log("Datos iniciales en miplantel.js:", dataPlayers);
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
    });
    
    $buttonGrid.addEventListener('click', () => {
        $buttonList.classList.remove('hidden');
        $buttonGrid.classList.add('hidden');
        $miplantelTable.classList.add('hidden');
        $miplantelGrilla.classList.remove('hidden');
        localStorage.setItem('vista-miplantel', 'grilla');
    });
}



const loadDataTeam = () => {
    document.getElementById("name-plantel").textContent = `: ${dataTeam.name}`;
}

