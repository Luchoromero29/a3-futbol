import { calcularFecha } from "../../utilities/functionsUtils.js";
import { getData, addPlayer, removePlayer, removeMorePlayers, dataPlayers } from './miplantel.js';


//Variables necesarias

//id de la tabla
const idTable = "#miplantel-table"
const itemId = "player_id"
const itemName = "player"

let selectedRowsCount = 0;
let selectedRowsArray = [];


document.addEventListener("DOMContentLoaded", async () => {
    await getData();
    initMiplantelTable();
});

const dataTableConfig = {
    columnDefs: [
        {
            targets: [0, 1, 3, 4, 5, 6], // Columnas no ordenables
            orderable: false
        },
        {
            targets: [0], // Primera columna (ID o similar)
            width: '60px'
        },
        {
            targets: [3, 4, 5],
            className: 'text-gray-bg'
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
const dataTable = $("#miplantel-table").DataTable(dataTableConfig);

export const initMiplantelTable = async () => {    
    
    //muestro la tabla
    renderTable();

    //----------------- JQuery de estilos DataTable --------------------------

    // Hover sobre las row texto negro
    $(`${idTable} tbody`).on('mouseenter', 'tr', function () {
        const row = $(this);
        row.find('td').addClass('!text-black');
        row.find('td:first-child button.select-row-button').addClass('border-black');
    });

    $(`${idTable} tbody`).on('mouseleave', 'tr', function () {
        const row = $(this);
        row.find('td').removeClass('!text-black');
        row.find('td:first-child button.select-row-button').removeClass('border-black');
    });

    // Botón de seleccionar todos los usuarios despues de que esten selecionados
    $('#deselectAllRowsButton').on('click', function () {
        deselectAllRows();
    })

    //cerrar modal de delete tocando fuera del cartel
    $('#deleteModal').on('click', function (e) {
        if (e.target === this) {
            $('#deleteModal').addClass('hidden');
        }
    })


    // Botón basurin para eliminar todo
    $('#deleteSelectedRowsButton').on('click', function () {

        //Mostrar modal
        $('#deleteModal').removeClass('hidden');

        //si cancela
        $('#cancelDelete').off('click').on('click', function () {
            $('#deleteModal').addClass('hidden');
        });

        //si confirma
        $('#confirmDelete').off('click').on('click', function () {
            console.log("Eliminando usuarios con IDs:", selectedRowsArray);

            // Eliminar la fila de la tabla
            selectedRowsArray.forEach((id) => {
                const row = $(`${idTable} tbody tr[${itemId}="${id}"]`);
                const rowIndex = dataTable.row(row).index();
                dataTable.row(rowIndex).remove().draw();
            })

            // Actualizar la lista de usuarios en el arreglo
            removeMorePlayers(selectedRowsArray);
            console.log(dataPlayers);


            //Ocultar modal
            $('#deleteModal').addClass('hidden');

            //elimino estilos de checkbox
            $('#selectAllRowsButton').removeClass('bg-green');

            mostrarSuccessMessage();
            $('#msg-success-pr').text(`${selectedRowsCount} usuarios eliminados correctamente`);
            let successMessageTimer = setTimeout(() => ocultarSuccessMessage(), 2500);

            $('#close-success-message').on('click', function () {
                $('#msg-success-pr').addClass('hidden');
                clearTimeout(successMessageTimer);
            })
            deselectAllRows();
            ocultarDeleteAll();
            updateSelectedUsersMessage();


            //let successMessageTimer = setTimeout(ocultar(), 3000);
        });

    });

    // Botón seleccionar todas las filas
    $('#selectAllRowsButton').on('click', function () {
        // Seleccionar todas las filas
        const rows = $(`${idTable} tbody tr`);

        if (!$(this).children().hasClass('hidden')) { //Si ya fue clikeado

            // Eliminar todas las selecciones de esa página
            deselectAllRows()
            ocultarDeleteAll();
            updateSelectedUsersMessage();

        } else {

            const selectedRows = rows.filter(':not(.selected-row)');

            //estilo de check
            $(this).children().toggleClass('hidden');
            $(this).addClass('bg-green');

            selectedRows.each(function () {
                const id = $(this).attr(itemId);
                selectedRowsArray.push(Number(id));
                selectedRowsCount += 1;
            });
            console.log(selectedRowsArray);


            selectedRows.toggleClass('selected-row'); // Seleccionar filas filtradas

            //actualizo msj de seleccionados
            updateSelectedUsersMessage();

            //muestro icono de eliminacion multiple
            mostrarDeleteAll();
        }

    });

    // Seleccionar fila button
    $(`${idTable} tbody`).on('click', 'button.select-row-button', function () {

        //recupero la fila de la tabla
        const row = $(this).closest('tr');

        //quito o agrego la clase selected row
        row.toggleClass('selected-row');

        //si se selecciono la fila
        if (row.hasClass('selected-row')) {
            selectedRowsCount += 1
            selectedRowsArray.push(Number(row[0].attributes[`${itemId}`].value))

            if ($('#deleteSelectedRowsButton').hasClass('hidden')) {
                mostrarDeleteAll();
            }

            //si se deselecciono la fila
        } else {
            selectedRowsCount -= 1
            selectedRowsArray = selectedRowsArray.filter(id => id !== Number(row[0].attributes[`${itemId}`].value))
        }

        //actualizo msj de seleccionados
        updateSelectedUsersMessage();

        //caso de querdar sin selecciones
        if (selectedRowsCount === 0) {
            ocultarDeleteAll();
        }

    });


    //Deseleccionar boton Seleccionar Todos si cambia de página
    $(`${idTable}`).on('page.dt', function () {
        deselectAllRows()
    });

    //Eliminar fila individual desde el icon eliminar 
    $(document).on('click', '.iconDeleteRow', function (e) {
        e.preventDefault();

        // Mostrar el modal de eliminación
        $('#deleteModal').removeClass('hidden');

        // Recuperar el item directamente del data attribute
        const itemRow = $(this).data(`${itemName}`);


        $('#cancelDelete').off('click').on('click', function () {
            $('#deleteModal').addClass('hidden');
        });


        $('#confirmDelete').off('click').on('click', function () {
            console.log("Eliminando item con ID:", itemRow.id);

            // Eliminar la fila de la tabla
            const row = $(`${idTable} tbody tr[${itemId}="${itemRow.id}"]`);
            const rowIndex = dataTable.row(row).index();
            dataTable.row(rowIndex).remove().draw();

            // Actualizar la lista de jugadores en el arreglo
            removePlayer(itemRow.id);

            // Ocultar el modal de eliminación
            $('#deleteModal').addClass('hidden');

            if (selectedRowsArray.includes(itemRow.id)) {

                selectedRowsCount -= 1
                selectedRowsArray = selectedRowsArray.filter(item => item !== itemRow.id)
                if (selectedRowsCount === 0) {
                    ocultarDeleteAll();
                }
                updateSelectedUsersMessage();
            }


            //Mostrar modal de confirmacion
            mostrarSuccessMessage(`El jugador "${itemRow.name}" ha sido eliminado correctamente`);

            $('#close-success-message').on('click', function () {
                $('#msg-success-pr').addClass('hidden');
                clearTimeout(successMessageTimer);
            })
        });
    });

    $(document).on('click', '.closeInfoUserModal', function () {


        $('#userInfoModal').addClass('hidden');
    })
}

export const renderTable = () => {

    //elimino el contenido de la tabla
    dataTable.clear().draw();
    
    dataPlayers.forEach((item, index) => {

        const row = dataTable.row.add([
            // Botón seleccionar
            `<div class="flex gap-2 items-center">
                <button class="select-row-button w-5 h-5 border-2 border-gray-300 rounded-md hover:border-green focus:outline-none transition-all relative" >
                    <img id="select-row-button-icon" src="../../assets/imgs/3.png" alt="" class="hidden w-full h-full" />   
                </button>
            </div>`,
            (index + 1),
            `<div class="flex gap-3 items-center">
                <div
                class="w-9 h-9 bg-green p-0.5 rounded-full overflow-hidden">
                        
                    <img src=${item.avatar}
                    class="w-full h-full rounded-full object-cover transition-transform duration-300 transform hover:scale-110"
                    alt="User Avatar">
                </div>
                <span>
                    ${item.name}
                </span>
            </div>`,
            item.position,
            calcularFecha(item.createdAt),
            calcularFecha(item.updatedAt),
            `<div class="flex gap-2 items-center justify-end">
                <button  id="button-show-player" class="iconShowInfoUser row-action-button w-8 h-8" data-${itemId}='${JSON.stringify(item.id)}'>
                    <img 
                        class="w-8 bg-black rounded-md border-2 border-gray-bg hover:bg-green" 
                        src="../../assets/imgs/1 Hover de lo que era la lupa original.png"
                    />
                </button>
                <a  id="" class="row-action-button w-8 h-8">
                    <img 
                        class="w-10 bg-black rounded-md border-2 border-gray-bg hover:bg-green" 
                        src="../../assets/imgs/arrow-tr-white.png"
                    />
                </a> 
                <a href="/users/${item.id}/delete/" data-${itemName}='${JSON.stringify(item)}' data-toggle="confirmation" class="row-action-button flex justify-center items-center w-8 h-8 iconDeleteRow">
                    <img 
                        class="w-8 bg-black rounded-md border-2 border-gray-bg hover:bg-green " 
                        src="../../assets/imgs/18 eliminar hover.png"
                    />
                </a>
            </div>`
        ]).draw().node();

        $(row).attr(`${itemId}`, item.id);
    });
}

//Mostrar msj de seleccion de usuarios
function updateSelectedUsersMessage() {
    const selectedUsersMessage = $('#selectedMessage');
    if (selectedRowsCount > 0) {
        selectedUsersMessage.removeClass('hidden');
        $('#selectedCount').text(selectedRowsCount);
        if (selectedRowsCount === 1) {
            selectedUsersMessage.find('p').text(selectedRowsCount + ' Seleccionado');
        } else {
            selectedUsersMessage.find('p').text(selectedRowsCount + ' Seleccionados');
        }
    } else {
        selectedUsersMessage.addClass('hidden');
    }
}

// Deseleccionar todas las filas

function deselectAllRows() {
    const rows = $(`${idTable} tbody tr`);  // Seleccionar solo las filas <tr> con la clase 'selected-row'

    rows.removeClass('selected-row');
    selectedRowsCount = 0;
    selectedRowsArray = []

    //oculto imagen de check
    $('#selectAllRowsButton').children().addClass('hidden');
    $('#selectAllRowsButton').removeClass('bg-green');

    updateSelectedUsersMessage();
    ocultarDeleteAll();
}
//Mostrar cruz para deseleccionar todo
const mostrarDeleteAll = () => {
    $('#deleteSelectedRowsButton').removeClass('hidden');
}

//Ocultar cruz para deseleccionar todo
const ocultarDeleteAll = () => {
    $('#deleteSelectedRowsButton').addClass('hidden');
}

const mostrarSuccessMessage = (label) => {
    $('#msg-success-pr').removeClass('hidden');
    $('#msg-success-pr').text(`${label}`);
    setTimeout(() => ocultarSuccessMessage(), 2500);
}

//Ocultar cruz para deseleccionar todo
const ocultarSuccessMessage = () => {
    $('#msg-success-pr').addClass('hidden');
}







