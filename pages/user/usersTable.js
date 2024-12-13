import { generateUserInfoModal } from './generalUserInfoModal.js';

$(document).ready(function () {
    initUsersTable();
});

//Variables necesarias


let selectedUsersRowsCount = 0;
let selectedUsersRowsArray = []

const dataTableConfig = {
    columnDefs: [
        {
            targets: [0, 2, 3, 4, 5, 6], // Columnas no ordenables
            orderable: false
        },
        {
            targets: [-1], // Última columna
            width: '150px'
        },
        {
            targets: [1], // Columna centrada
            className: 'text-center'
        },
        {
            targets: [0], // Primera columna
            width: '80px'
        },
        {
            targets: [3, 4, 5], // Columnas de texto gris
            className: 'text-gray-bg'
        },
    ],
    order: [[1, 'asc']], // Orden por columna ID
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

        const searchInput = $('#users-table_filter input');

        // Agrega una clase CSS cuando el input tenga contenido
        searchInput.on('input', function () {
            $(this).toggleClass('!bg-none', this.value.trim() !== '');
        });
    }
};



//Peticion a la API
const getUsers = async () => {
    return fetch('../../data/usersTable.json')
        .then(response => response.json())
        .then(data => data)
}

//Inizializacion de la tabla de usuarios
const initUsersTable = async () => {

    let users = await getUsers();
    console.log(users);
    

    const dataTable = $('#users-table').DataTable(dataTableConfig);


    //Agregar Usuarios a la tabla


        users.forEach(function (item) {
            const row = dataTable.row.add([
                // Botón seleccionar
                `<div class="flex gap-2 items-center">
                    <button class="select-button w-5 h-5 border-2 border-gray-300 rounded-md hover:border-green focus:outline-none transition-all" onclick="toggleCheckbox(this)">
                        <img id="select-button-icon" src="../../assets/imgs/3.png" alt="" class="hidden w-full h-full" />   
                    </button>
                </div>`,
                `<div class="flex  items-center justify-center">
                ${item.id}
                </div>`,
                `<div class="flex gap-3 items-center">
                    <div
                    class="w-9 h-9 bg-green p-0.5 rounded-full overflow-hidden">
                            
                        <img src=${item.avatar}
                        class="w-full h-full rounded-full object-cover transition-transform duration-300 transform hover:scale-110"
                        alt="User Avatar">
                    </div>
                    <span>
                        ${item.email}
                    </span>
                </div>`,
                item.nombre,
                item.cargo,
                item.rol, //En los items de acciones que hay abajo estaba como href la url de la vista del front, dejo la del user.php, para que funcione en mi maquina nomas, despues solo referenciar la verdadera href y colocar el id como parametro 
                `<div class="flex gap-2 items-center justify-end">
                    <button class="iconShowInfoUser row-action-button w-7 h-7" data-user='${JSON.stringify(item)}'>
                        <img 
                            class="w-7 bg-black rounded-md border-2 border-gray-bg hover:bg-green" 
                            src="../../assets/imgs/1 Hover de lo que era la lupa original.png"
                        />
                    </button>
                    <a href="user.php?id=${item.id}&to=user_list.php" class="row-action-button w-7 h-7">
                        <img 
                            class="w-7 bg-green rounded-md border-2 border-gray-bg hover:bg-black" 
                            src="../../assets/imgs/14 lapiz hover.png"
                        />
                    </a> 
                    <a href="/users/${item.id}/delete/" data-user='${JSON.stringify(item)}' data-toggle="confirmation" class="row-action-button w-7 h-7 iconDeleteUser">
                        <img 
                            class="w-7 bg-green rounded-md border-2 border-gray-bg hover:bg-black" 
                            src="../../assets/imgs/10 eliminar hover.png"
                        />
                    </a>
                </div>`
            ]).draw().node();

            $(row).attr('user_id', item.id);
        });



    //----------------- JQuery de estilos DataTable --------------------------


    // Hover sobre las row texto negro
    $('#users-table tbody').on('mouseenter', 'tr', function () {
        const row = $(this);
        row.find('td').addClass('!text-black');
        row.find('td:first-child button.select-button').addClass('border-black');
    });

    $('#users-table tbody').on('mouseleave', 'tr', function () {
        const row = $(this);
        row.find('td').removeClass('!text-black');
        row.find('td:first-child button.select-button').removeClass('border-black');
    });

    $('#deselectAllButton').on('click', function () {
        deselectAllUsersRows();
    })

    $('#deleteModal').on('click', function (e) {
        if(e.target === this){
            hideModalDelete();
        }
    })


    // Botón X para deseleccionar todo
    $('#deselectAllUsersButton').on('click', function () {

        //Mostrar modal
        showModalDelete();
    
       
        //si cancela
        $('#cancelDelete').off('click').on('click', function () {
            hideModalDelete();
        });
        
        //si confirma
        $('#confirmDelete').off('click').on('click', function () {
            console.log("Eliminando usuarios con IDs:", selectedUsersRowsArray);
    
            // Eliminar la fila de la tabla
            selectedUsersRowsArray.forEach((userId) => {
                const row = $(`#users-table tbody tr[user_id="${userId}"]`); 
                const rowIndex = dataTable.row(row).index(); 
                dataTable.row(rowIndex).remove().draw(); 

                // Actualizar la lista de usuarios en el arreglo
                users = users.filter((user) => user.id != userId);
            })
    

            //Ocultar modal
            hideModalDelete();

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
        const rows = $('#users-table tbody tr');
        
        if (!$(this).children().hasClass('hidden')) { //Si ya fue clikeado

            // Eliminar todas las selecciones de esa página
            deselectAllUsersRows()
            ocultarDeleteAll();
            updateSelectedUsersMessage();
            $(this).removeClass('bg-green');

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
    $('#users-table tbody').on('click', 'button.select-button', function () {
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

    //Estilos del checkbox


    //Deseleccionar boton Seleccionar Todos si cambia de página
    $('#users-table').on('page.dt', function () {
        deselectAllUsersRows()
        $('#selectAllUsersButton').removeClass('bg-green');
    });

    // CONFIMRACION O CANCELACION DE ELIMINACION
    $(document).on('click', '.iconDeleteUser' , function (e) {
        e.preventDefault();
    
        // Mostrar el modal de eliminación
        showModalDelete();
    
        // Recuperar el userId directamente del data attribute
        const user = $(this).data('user');
    
        
        $('#cancelDelete').off('click').on('click', function () {
            hideModalDelete();
        });
    
        
        $('#confirmDelete').off('click').on('click', function () {
            console.log("Eliminando usuario con ID:", user.id);
    
            // Eliminar la fila de la tabla
            const row = $(`#users-table tbody tr[user_id="${user.id}"]`); 
            const rowIndex = dataTable.row(row).index(); 
            dataTable.row(rowIndex).remove().draw(); 
    
            // Actualizar la lista de usuarios en el arreglo
            users = users.filter((item) => item.id != user.id);
   
            // Ocultar el modal de eliminación
            hideModalDelete();
            console.log(selectedUsersRowsArray);
            console.log(user.id);
            
            
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
    const rows = $('#users-table tbody tr');  // Seleccionar solo las filas <tr> con la clase 'selected-row'

    rows.removeClass('selected-row');
    selectedUsersRowsCount = 0;
    selectedUsersRowsArray = []

    //oculto imagen de check
    $('#selectAllUsersButton').children().addClass('hidden');
    
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

function showModalDelete() {
    console.log("aca");
    
    const modal = document.getElementById('deleteModal');
    console.log(modal);
    
    modal.classList.remove('hidden'); // Agregar la animación de entrada
}

// Función para ocultar el modal con animación
function hideModalDelete() {
    const modal = document.getElementById('deleteModal');
    modal.classList.add('hidden'); // Agregar la animación de salida
}




