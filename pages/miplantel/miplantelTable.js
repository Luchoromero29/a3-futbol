import { generateUserInfoModal } from '../user/generalUserInfoModal.js';

//Variables necesarias
let dataPlantel;
let dataPlayers;
let dataPositions;
let dataTeam;

let selectedUsersRowsCount = 0;
let selectedUsersRowsArray = []

document.addEventListener("DOMContentLoaded", async () => {
    await getData();
    console.log(dataPlayers);
    console.log(dataTeam);
    console.log(dataPositions);
    
    initMiplantelTable();
});



const dataTableConfig = {
    columnDefs: [
        {
            targets: [0, 1, 3, 4], // Columnas no ordenables
            orderable: false
        },
        {
            targets: [0], // Primera columna (ID o similar)
            width: '60px'
        },
        {
            targets: [3], // Columna con estilo gris
            className: 'text-grayBg'
        }
    ],
    order: [[2, 'asc']], // Ordenar por la columna de índice 2
    language: {
        lengthMenu: '_MENU_ Usuarios',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ Usuarios',
        infoEmpty: 'Mostrando 0 a 0 de 0 Usuarios',
        emptyTable: 'No se encontraron usuarios disponibles',
        infoFiltered: '(Filtrados de un total de _MAX_ usuarios)',
        zeroRecords: 'No se encontraron usuarios con ese nombre',
        search: 'Buscar:',
        paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior'
        }
    },
    initComplete: function () {
        // Cursor pointer al dropdown de cantidad de registros para mostrar
        const lengthMenuDropdown = $(this).closest('.dataTables_wrapper').find('.dataTables_length select');
        lengthMenuDropdown.addClass('cursor-pointer');

        const searchInput = $('#miplantel-table_filter input');

        // Simplificación del manejo del estado del input de búsqueda
        searchInput.on('input', function () {
            $(this).toggleClass('!bg-none', this.value.trim() !== '');
        });
    }
};



//Peticion a la API

const getDataPlantel = async () => {
    return await fetch('../../data/plantel.json')
    .then(response => response.json())
    .then(data => data);
}

const getData = async () => {
    dataPlantel = await getDataPlantel();
    console.log(dataPlantel);
    
    dataPlayers = dataPlantel.players
    dataPositions = dataPlantel.positions;
    dataTeam = dataPlantel.team;
}
//Inizializacion de la tabla de usuarios
const initMiplantelTable = async () => {

    let users = await getUsers();

    const dataTable = $('#miplantel-table').DataTable(dataTableConfig);


    //Agregar Usuarios a la tabla


        users.forEach(function (item) {
            const row = dataTable.row.add([
                // Botón seleccionar
                `<div class="flex gap-2 items-center">
                    <button class="select-button w-5 h-5 border-2 border-gray-300 rounded-md hover:border-green focus:outline-none transition-all relative" onclick="toggleCheckbox(this)">
                        <img id="select-button-icon" src="assets/imgs/3.png" alt="" class="hidden w-full h-full" />   
                    </button>
                </div>`,
                `<div class="flex gap-3 items-center">
                    <div
                    class="w-9 h-9 bg-green p-0.5 rounded-full overflow-hidden">
                            
                        <img src=${item.avatar}
                        class="w-full h-full rounded-full object-cover transition-transform duration-300 transform hover:scale-110"
                        alt="User Avatar">
                    </div>
                    <span>
                        ${calcularEdad(item.birthdate)}
                    </span>
                </div>`,
                item.nombre,
                item.rol,
                `<div class="flex gap-2 items-center justify-end">
                    <button class="iconShowInfoUser row-action-button w-7 h-7" data-user='${JSON.stringify(item)}'>
                        <img 
                            class="w-7 bg-black rounded-md border-2 border-grayBg hover:bg-green" 
                            src="assets/imgs/1 Hover de lo que era la lupa original.png"
                        />
                    </button>
                    <a href="user.php?id=${item.id}&to=miplantel.php" class="row-action-button w-7 h-7">
                        <img 
                            class="w-7 bg-green rounded-md border-2 border-grayBg hover:bg-black" 
                            src="assets/imgs/14 lapiz hover.png"
                        />
                    </a> 
                    <a href="/users/${item.id}/delete/" data-user='${JSON.stringify(item)}' data-toggle="confirmation" class="row-action-button w-7 h-7 iconDeleteUser">
                        <img 
                            class="w-7 bg-green rounded-md border-2 border-grayBg hover:bg-black" 
                            src="assets/imgs/10 eliminar hover.png"
                        />
                    </a>
                </div>`
            ]).draw().node();

            $(row).attr('user_id', item.id);
        });
        
        // Agregar el atributo pr-id a la fila



    //----------------- JQuery de estilos DataTable --------------------------


    // Hover sobre las row texto negro
    $('#miplantel-table tbody').on('mouseenter', 'tr', function () {
        const row = $(this);
        row.find('td').addClass('!text-black');
        row.find('td:first-child button.select-button').addClass('border-black');
    });

    $('#miplantel-table tbody').on('mouseleave', 'tr', function () {
        const row = $(this);
        row.find('td').removeClass('!text-black');
        row.find('td:first-child button.select-button').removeClass('border-black');
    });

    $('#deselectAllButton').on('click', function () {
        deselectAllUsersRows();
    })

    $('#deleteModal').on('click', function (e) {
        if(e.target === this){
            $('#deleteModal').addClass('hidden');
        }
    })


    // Botón X para deseleccionar todo
    $('#deselectAllUsersButton').on('click', function () {

        //Mostrar modal
        $('#deleteModal').removeClass('hidden');
    
       
        //si cancela
        $('#cancelDelete').off('click').on('click', function () {
            $('#deleteModal').addClass('hidden');
        });
        
        //si confirma
        $('#confirmDelete').off('click').on('click', function () {
            console.log("Eliminando usuarios con IDs:", selectedUsersRowsArray);
    
            // Eliminar la fila de la tabla
            selectedUsersRowsArray.forEach((userId) => {
                const row = $(`#miplantel-table tbody tr[user_id="${userId}"]`); 
                const rowIndex = dataTable.row(row).index(); 
                dataTable.row(rowIndex).remove().draw(); 

                // Actualizar la lista de usuarios en el arreglo
                users = users.filter((user) => user.id != userId);
            })
    

            
            //Ocultar modal
            $('#deleteModal').addClass('hidden');
            
            //elimino estilos de checkbox
            $('#selectAllUsersButton').removeClass('bg-green');

            mostrarSuccessMessage();
            $('#msg-success-pr').text(`${selectedUsersRowsCount} usuarios eliminados correctamente`);
            let successMessageTimer = setTimeout(() => ocultarSuccessMessage(), 2500);

            $('#close-success-message').on('click', function () {
                $('#msg-success-pr').addClass('hidden');
                clearTimeout(successMessageTimer);
            })
            deselectAllUsersRows();
            ocultarDeleteAll();
            updateSelectedUsersMessage();


            //let successMessageTimer = setTimeout(ocultar(), 3000);
        });

    });

    // Botón seleccionar todas las filas
    $('#selectAllUsersButton').on('click', function () {
        // Seleccionar todas las filas
        const rows = $('#miplantel-table tbody tr');
        console.log("Funciona");
        
        if (!$(this).children().hasClass('hidden')) { //Si ya fue clikeado

            // Eliminar todas las selecciones de esa página
            deselectAllUsersRows()
            ocultarDeleteAll();
            updateSelectedUsersMessage();

        } else {

            const selectedUsersRows = rows.filter(':not(.selected-row)');

            //estilo de check
            $(this).children().toggleClass('hidden');
            $(this).addClass('bg-green');

            selectedUsersRows.each(function () {

                const userId = $(this).attr('user_id');
                selectedUsersRowsArray.push(userId);
                selectedUsersRowsCount += 1;
            });

            selectedUsersRows.toggleClass('selected-row'); // Seleccionar filas filtradas
            
            //actualizo msj de seleccionados
            updateSelectedUsersMessage();

            //muestro icono de eliminacion multiple
            mostrarDeleteAll();
        }

    });

    // Seleccionar fila button
    $('#miplantel-table tbody').on('click', 'button.select-button', function () {
        const row = $(this).closest('tr');
        row.toggleClass('selected-row');
        if (row.hasClass('selected-row')) {
            selectedUsersRowsCount += 1
            selectedUsersRowsArray.push(row[0].attributes['user_id'].value)

            if ($('#deselectAllUsersButton').hasClass('hidden')) {
                mostrarDeleteAll();
            }

        } else {
            selectedUsersRowsCount -= 1
            selectedUsersRowsArray = selectedUsersRowsArray.filter(row_id => row_id !== row[0].attributes['user_id'].value)
        }
        updateSelectedUsersMessage();

        if (selectedUsersRowsCount === 0) {
            ocultarDeleteAll();
        }

    });

    //Deseleccionar boton Seleccionar Todos si cambia de página
    $('#miplantel-table').on('page.dt', function () {
        deselectAllUsersRows()
    });

    // CONFIMRACION O CANCELACION DE ELIMINACION
    $(document).on('click', '.iconDeleteUser' , function (e) {
        e.preventDefault();
    
        // Mostrar el modal de eliminación
        $('#deleteModal').removeClass('hidden');
    
        // Recuperar el userId directamente del data attribute
        const user = $(this).data('user');
    
        
        $('#cancelDelete').off('click').on('click', function () {
            $('#deleteModal').addClass('hidden');
        });
    
        
        $('#confirmDelete').off('click').on('click', function () {
            console.log("Eliminando usuario con ID:", user.id);
    
            // Eliminar la fila de la tabla
            const row = $(`#miplantel-table tbody tr[user_id="${user.id}"]`); 
            const rowIndex = dataTable.row(row).index(); 
            dataTable.row(rowIndex).remove().draw(); 
    
            // Actualizar la lista de usuarios en el arreglo
            users = users.filter((item) => item.id != user.id);
   
            // Ocultar el modal de eliminación
            $('#deleteModal').addClass('hidden');

            
            
            if(selectedUsersRowsArray.includes(String(user.id))){

                selectedUsersRowsCount -= 1
                selectedUsersRowsArray = selectedUsersRowsArray.filter(item => item !== user.id)
                if (selectedUsersRowsCount === 0) {
                    ocultarDeleteAll();
                }
                updateSelectedUsersMessage();
            }


            //Mostrar modal de confirmacion
            mostrarSuccessMessage();
            $('#msg-success-pr').text(`El usuario "${user.nombre}" ha sido eliminado correctamente`);
            let successMessageTimer = setTimeout(() => ocultarSuccessMessage(), 2500);

            $('#close-success-message').on('click', function () {
                $('#msg-success-pr').addClass('hidden');
                clearTimeout(successMessageTimer);
            })
        });
    });

    //Mostrar información de usuario
    $(document).on('click', '.iconShowInfoUser' , function () {
        $('#userInfoModal').removeClass('hidden');
        const user = $(this).data('user');
        $('#userInfoModal').html(generateUserInfoModal(user));
   
    })

    $(document).on('click', '.closeInfoUserModal' , function () {

        
        $('#userInfoModal').addClass('hidden');
    })
}

//Mostrar msj de seleccion de usuarios
function updateSelectedUsersMessage() {
    const selectedUsersMessage = $('#selectedMessage');
    if (selectedUsersRowsCount > 0) {
        selectedUsersMessage.removeClass('hidden');
        $('#selectedCount').text(selectedUsersRowsCount);
        if (selectedUsersRowsCount === 1) {
            selectedUsersMessage.find('p').text(selectedUsersRowsCount + ' Seleccionado');
        } else {
            selectedUsersMessage.find('p').text(selectedUsersRowsCount + ' Seleccionados');
        }
    } else {
        selectedUsersMessage.addClass('hidden');
    }
}

// Deseleccionar todas las filas

function deselectAllUsersRows() {
    const rows = $('#miplantel-table tbody tr');  // Seleccionar solo las filas <tr> con la clase 'selected-row'

    rows.removeClass('selected-row');
    selectedUsersRowsCount = 0;
    selectedUsersRowsArray = []

    //oculto imagen de check
    $('#selectAllUsersButton').children().addClass('hidden');
    $('#selectAllUsersButton').removeClass('bg-green');
    
    updateSelectedUsersMessage();
    ocultarDeleteAll();
}
//Mostrar cruz para deseleccionar todo
const mostrarDeleteAll = () => {
    $('#deselectAllUsersButton').removeClass('hidden');
}

//Ocultar cruz para deseleccionar todo
const ocultarDeleteAll = () => {
    $('#deselectAllUsersButton').addClass('hidden');
}

const mostrarSuccessMessage = () => {
    $('#msg-success-pr').removeClass('hidden');
}

//Ocultar cruz para deseleccionar todo
const ocultarSuccessMessage = () => {
    $('#msg-success-pr').addClass('hidden');
}

const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;    
}




