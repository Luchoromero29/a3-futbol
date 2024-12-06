import { calcularFecha } from "../../utilities/functionsUtils.js";


//Variables necesarias

let equipos
let dataTable

let selectedEquiposRowsCount = 0;
let selectedEquiposRowsArray = [];



const dataTableConfig = {
    columnDefs: [
        {
            targets: [0, 2, 3, 4, 5, 6], // Columnas no ordenables
            orderable: false
        },
        {
            targets: [1], // Columna ID centrada
            className: 'dt-head-center'
        },
        {
            targets: [-1], // Última columna
            width: '100px'
        },
        {
            targets: [0], // Primera columna
            width: '60px'
        },
        {
            targets: [2, 3], // Columnas específicas
            width: '200px'
        },
        {
            targets: [3, 4, 5], // Columnas nombre
            className: 'text-grayBg'
        },
    ],
    order: [[1, 'asc']], // Ordenar por columna ID ascendente
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

        const searchInput = $('#rivales-table_filter input');

        // Agrega una clase CSS cuando el input tenga contenido
        searchInput.on('input', function () {
            if (this.value.trim() !== '') {
                $(this).addClass('!bg-none');
            } else {
                $(this).removeClass('!bg-none');
            }
        });
    }
};

$(document).ready(async function () {

    equipos = await getEquipos();



    initEquiposTable();
    initGrilla();


});



//Peticion a la API
const getEquipos = async () => {
    return fetch('../../data/equipos.json')
        .then(response => response.json())
        .then(data => data)
}

//Inizializacion de la tabla de usuarios
const initEquiposTable = async () => {

    dataTable = $('#rivales-table').DataTable(dataTableConfig);
    renderTable();

    //----------------- JQuery de estilos DataTable --------------------------


    // Hover sobre las row texto negro
    $('#rivales-table tbody').on('mouseenter', 'tr', function () {
        const row = $(this);
        row.find('td').addClass('!text-black');
        row.find('td:first-child button.select-button').addClass('border-black');
    });

    $('#rivales-table tbody').on('mouseleave', 'tr', function () {
        const row = $(this);
        row.find('td').removeClass('!text-black');
        row.find('td:first-child button.select-button').removeClass('border-black');
    });

    $('#deselectAllButton').on('click', function () {
        deselectAllEquiposRows();
    })

    $('#deleteModal').on('click', function (e) {
        if (e.target === this) {
            $('#deleteModal').addClass('hidden');
        }
    })




    // Botón X para deseleccionar todo
    $('#deselectAllEquiposButton').on('click', function () {

        //Mostrar modal
        $('#deleteModal').removeClass('hidden');


        //si cancela
        $('#cancelDelete').off('click').on('click', function () {
            $('#deleteModal').addClass('hidden');
        });

        //si confirma
        $('#confirmDelete').off('click').on('click', function () {

            //Imprimo los id de los equipos a eliminar
            console.log("Eliminando usuarios con IDs:", selectedEquiposRowsArray);

            // Eliminar la fila de la tabla
            selectedEquiposRowsArray.forEach((equipoId) => {
                const row = $(`#rivales-table tbody tr[equipo_id="${equipoId}"]`);
                const rowIndex = dataTable.row(row).index();
                dataTable.row(rowIndex).remove().draw();

                //imprimo los equipos eliminados
                const equipoEliminado = equipos.find(equipo => equipo.id == equipoId);
                if (equipoEliminado) {
                    console.log('El equipo eliminado es: ', equipoEliminado);
                }
            })

            // Actualizar la lista de usuarios en el arreglo
            equipos = equipos.filter((equipo) =>
                !selectedEquiposRowsArray.includes(equipo.id)
            );

            //Ocultar modal
            $('#deleteModal').addClass('hidden');

            mostrarSuccessMessage();
            $('#msg-success-pr').text(`${selectedEquiposRowsCount} equipos eliminados correctamente`);
            let successMessageTimer = setTimeout(() => ocultarSuccessMessage(), 2500);

            $('#close-success-message').on('click', function () {
                $('#msg-success-pr').addClass('hidden');
                clearTimeout(successMessageTimer);
            })
            deselectAllEquiposRows();
            ocultarDeleteAll();
            updateSelectedEquiposMessage();


            //let successMessageTimer = setTimeout(ocultar(), 3000);
        });

    });

    // Botón seleccionar todas las filas
    $('#selectAllEquiposButton').on('click', function () {
        // Seleccionar todas las filas
        const rows = $('#rivales-table tbody tr');

        if (!$(this).children().hasClass('hidden')) { //Si ya fue clikeado

            // Eliminar todas las selecciones de esa página
            deselectAllEquiposRows()
            ocultarDeleteAll();
            updateSelectedEquiposMessage();
            $(this).removeClass('bg-green');

        } else {

            const selectedEquiposRows = rows.filter(':not(.selected-row)');

            //estilo de check
            $(this).children().toggleClass('hidden');
            $(this).addClass('bg-green');

            selectedEquiposRows.each(function () {

                const equipoId = $(this).attr('equipo_id');
                selectedEquiposRowsArray.push(equipoId);
                selectedEquiposRowsCount += 1;
            });

            selectedEquiposRows.toggleClass('selected-row'); // Seleccionar filas filtradas

            //actualizo msj de seleccionados
            updateSelectedEquiposMessage();

            //muestro icono de eliminacion multiple
            mostrarDeleteAll();
        }


    });

    // Seleccionar fila button
    $('#rivales-table tbody').on('click', 'button.select-button', function () {
        const row = $(this).closest('tr');
        row.toggleClass('selected-row');
        if (row.hasClass('selected-row')) {
            selectedEquiposRowsCount += 1
            selectedEquiposRowsArray.push(row[0].attributes['equipo_id'].value)

            if ($('#deselectAllEquiposButton').hasClass('hidden')) {
                mostrarDeleteAll();
            }

        } else {
            selectedEquiposRowsCount -= 1
            selectedEquiposRowsArray = selectedEquiposRowsArray.filter(row_id => row_id !== row[0].attributes['equipo_id'].value)
        }
        updateSelectedEquiposMessage();

        if (selectedEquiposRowsCount === 0) {
            ocultarDeleteAll();
        }
    });

    //Estilos del checkbox


    //Deseleccionar boton Seleccionar Todos si cambia de página
    $('#rivales-table').on('page.dt', function () {
        deselectAllEquiposRows()
        $('#selectAllEquiposButton').removeClass('bg-green');
    });

    // CONFIMRACION O CANCELACION DE ELIMINACION
    $(document).on('click', '.iconDelete', function (e) {
        e.preventDefault();

        // Mostrar el modal de eliminación
        $('#deleteModal').removeClass('hidden');

        // Recuperar el equipoId directamente del data attribute
        const equipo = $(this).data('equipo');


        $('#cancelDelete').off('click').on('click', function () {
            $('#deleteModal').addClass('hidden');
        });


        $('#confirmDelete').off('click').on('click', function () {
            console.log("Eliminando equipo con ID:", equipo.id);

            // Eliminar la fila de la tabla
            const row = $(`#rivales-table tbody tr[equipo_id="${equipo.id}"]`);
            const rowIndex = dataTable.row(row).index();
            dataTable.row(rowIndex).remove().draw();

            const equipoEliminado = equipos.find(item => item.id == equipo.id);
            if (equipoEliminado) {
                console.log('El equipo eliminado es: ', equipoEliminado);
            }

            // Actualizar la lista de usuarios en el arreglo
            equipos = equipos.filter((item) => item.id != equipo.id);



            // Ocultar el modal de eliminación
            $('#deleteModal').addClass('hidden');

            if (selectedEquiposRowsArray.includes(String(equipo.id))) {
                selectedEquiposRowsCount -= 1
                selectedEquiposRowsArray = selectedEquiposRowsArray.filter(item => item !== equipo.id)
                if (selectedEquiposRowsCount === 0) {
                    ocultarDeleteAll();
                }
                updateSelectedEquiposMessage();
            }


            //Mostrar modal de confirmacion
            mostrarSuccessMessage();
            $('#msg-success-pr').text(`El equipo "${equipo.nombre}" ha sido eliminado correctamente`);
            let successMessageTimer = setTimeout(() => ocultarSuccessMessage(), 2500);

            $('#close-success-message').on('click', function () {
                $('#msg-success-pr').addClass('hidden');
                clearTimeout(successMessageTimer);
            })
        });
    });
}

const volverEstadoInicial = () => {
    deselectAllEquiposRows();
    $('#selectAllEquiposButton').removeClass('bg-green');
    updateSelectedEquiposMessage();
}



const renderTable = () => {

    dataTable.clear();

    equipos.forEach(function (item, index) {
        const row = dataTable.row.add([
            // Botón seleccionar
            `<div class="flex gap-2 items-center">
                <button class="select-button w-5 h-5 border-2 border-gray-300 rounded-md hover:border-green focus:outline-none transition-all relative">
                    <img id="select-button-icon" src="../../assets/imgs/3.png" alt="" class="hidden w-full h-full" />   
                </button>
            </div>`,
            `<div class="flex  items-center justify-center">
                ${index + 1}
            </div>`
            ,`<div class="flex gap-3 items-center">
                <div
                    class="w-9 h-9  p-0.5 rounded-full overflow-hidden">
                            
                        <img src=${item.escudo}
                        class="w-full h-full rounded-full object-cover transition-transform duration-300 transform hover:scale-110"
                        alt="Equipo Avatar">
                    </div>
                    <span>
                        ${item.nombre}
                    </span>
                </div>`,
            item.liga,
            calcularFecha(item.create),
            calcularFecha(item.update), //En los items de acciones que hay abajo estaba como href la url de la vista del front, dejo la del user.php, para que funcione en mi maquina nomas, despues solo referenciar la verdadera href y colocar el id como parametro 
            `<div class="flex gap-2 items-center justify-end">
                    <a href="rivales_form.php?id=${item.id}&to=rivales.php" class="row-action-button w-7 h-7">
                        <img 
                            class="w-7 bg-black rounded-md border-2 border-grayBg hover:bg-green" 
                            src="../../assets/imgs/14 lapiz hover.png"
                        />
                    </a> 
                    <a href="/equipos/${item.id}/delete/" data-equipo='${JSON.stringify(item)}' data-toggle="confirmation" class="row-action-button w-7 h-7 iconDelete">
                        <img 
                            class="w-7 bg-black rounded-md border-2 border-grayBg hover:bg-green" 
                            src="../../assets/imgs/10 eliminar hover.png"
                        />
                    </a>
                </div>`
        ]).draw().node();

        $(row).attr('equipo_id', item.id);
    });

}

//Mostrar msj de seleccion de usuarios
function updateSelectedEquiposMessage() {
    const selectedEquiposMessage = $('#selectedMessage');
    if (selectedEquiposRowsCount > 0) {
        selectedEquiposMessage.removeClass('hidden');
        $('#selectedCount').text(selectedEquiposRowsCount);
        if (selectedEquiposRowsCount === 1) {
            selectedEquiposMessage.find('p').text(selectedEquiposRowsCount + ' Seleccionado');
        } else {
            selectedEquiposMessage.find('p').text(selectedEquiposRowsCount + ' Seleccionados');
        }
    } else {
        selectedEquiposMessage.addClass('hidden');
    }
}

// Deseleccionar todas las filas
function deselectAllEquiposRows() {
    const rows = $('#rivales-table tbody tr');  // Seleccionar solo las filas <tr> con la clase 'selected-row'

    rows.removeClass('selected-row');
    selectedEquiposRowsCount = 0;
    selectedEquiposRowsArray = []

    //oculto imagen de check
    $('#selectAllEquiposButton').children().addClass('hidden');
    $('#selectAllEquiposButton').removeClass('bg-green');

    updateSelectedEquiposMessage();
    ocultarDeleteAll();
}

//Mostrar cruz para deseleccionar todo
const mostrarDeleteAll = () => {
    $('#deselectAllEquiposButton').removeClass('hidden');
}

//Ocultar cruz para deseleccionar todo
const ocultarDeleteAll = () => {
    $('#deselectAllEquiposButton').addClass('hidden');
}

const mostrarSuccessMessage = () => {
    $('#msg-success-pr').removeClass('hidden');
}

//Ocultar cruz para deseleccionar todo
const ocultarSuccessMessage = () => {
    $('#msg-success-pr').addClass('hidden');
}


// ==================================== SECCION DE FUNCIONALIDAD PARA LA GRILLA ==================================


const initGrilla = () => {


    const renderGrilla = () => {

        //Elemento grilla
        const grillaContainer = $('#grilla-container');

        // Limpiar grilla
        grillaContainer.html('');

        // Renderizar cada equipo
        equipos.forEach((equipo, index) => {
            grillaContainer.append(renderItemGrilla(equipo, index));
        });

        //actualizamos contador
        $('#club-count').text('(' + equipos.length + ')');

        // Inicializar eventos de drag and drop
        initDragAndDrop();
        volverEstadoInicial();
    }



    $('#button-list-rivales, #button-grid-rivales').on('click', function () {
        if ($('#rivales-table-container').hasClass('hidden')) {
            renderGrilla();
        } else {
            renderTable();
        }

    });

    // Re-renderizar los ítems en la grilla
    const renderItems = () => {
        const grillaContainer = $('#grilla-container');
        grillaContainer.html(''); // Limpiar contenedor
        equipos.forEach((equipo, index) => {
            grillaContainer.append(renderItemGrilla(equipo, index));
        });

        // Volver a inicializar los eventos de drag and drop después de cada renderizado
        initDragAndDrop();
    };

    // Inicializa los eventos de drag and drop
    const initDragAndDrop = () => {
        let draggedItemIndex = null;

        $('.rivales-item-drag').each(function () {

            // Inicia el arrastre
            $(this).on('dragstart', function (e) {
                draggedItemIndex = parseInt($(this).attr('data-index')); // Guardar el índice del elemento arrastrado
                e.originalEvent.dataTransfer.effectAllowed = 'move';

                const itemContainer = e.target.closest('.rivales-item-drag');

                e.originalEvent.dataTransfer.setDragImage(itemContainer, 0, 0); // Especificar que el ítem completo sea arrastrado

                itemContainer.classList.add('dragging');

            });

            // Finaliza el arrastre
            $(this).on('dragend', function (e) {
                const itemContainer = e.target.closest('.rivales-item-drag');
                itemContainer.classList.remove('dragging');
            });

            // Arrastrar sobre otros elementos
            $(this).on('dragover', function (e) {
                e.preventDefault();

                // Obtener el contenedor del ítem de la grilla
                const itemContainer = e.target.closest('.rivales-item-drag');

                if (!itemContainer) return;

                const targetIndex = parseInt($(itemContainer).attr('data-index'));

                // Evitar que los estilos se apliquen cuando se arrastra sobre sí mismo
                if (draggedItemIndex === targetIndex) {
                    itemContainer.style.transform = '';
                    return;
                }

                const bounding = itemContainer.getBoundingClientRect();
                const offset = e.clientX - bounding.left;

                // Limpiar cualquier transformación anterior
                itemContainer.style.transform = '';
                itemContainer.style.transition = 'transform 0.2s ease';

                // Ajustar la inclinación para indicar hacia dónde se moverá el ítem
                if (offset > bounding.width / 2) {
                    // Si el ratón está en la mitad derecha, inclinar hacia la derecha
                    itemContainer.style.transform = 'rotate(-2deg) translateX(-10px)';

                } else {
                    // Si el ratón está en la mitad izquierda, inclinar hacia la izquierda
                    itemContainer.style.transform = 'rotate(+2deg) translateX(+10px)';

                }
            });


            // Limpiar los bordes al salir de un elemento
            $(this).on('dragleave', function (e) {
                const itemContainer = e.target.closest('.rivales-item-drag');
                itemContainer.style.transform = '';
            });

            // Soltar el equipo en una nueva posición
            $(this).on('drop', function (e) {
                e.preventDefault();

                const targetIndex = parseInt($(this).attr('data-index'));
                const bounding = e.target.getBoundingClientRect();
                const offset = e.clientX - bounding.left;

                // Determinar la posición en la que se debe insertar el ítem arrastrado
                let newIndex;
                if (offset > bounding.width / 2) {
                    newIndex = targetIndex; // Se mueve después del elemento objetivo
                } else {
                    newIndex = targetIndex; // Se mantiene en la misma posición
                }

                // Corregimos el orden: mover el ítem desde draggedItemIndex a newIndex
                insertItem(draggedItemIndex, newIndex);
            });
        });
    };

    // Función para mover el ítem en el array y re-renderizar
    const insertItem = (fromIndex, toIndex) => {
        if (fromIndex === toIndex) return; // Si el índice no cambia, no hacer nada

        const itemToMove = equipos.splice(fromIndex, 1)[0]; // Remover el ítem arrastrado
        equipos.splice(toIndex, 0, itemToMove);

        // Insertar en la nueva posición
        renderItems(); // Re-renderizar los elementos
    };

    if ($('#rivales-table-container').hasClass('hidden')) {
        renderGrilla();
    }
};

const renderItemGrilla = (equipo, index) => {
    const div = document.createElement('div');
    div.className = 'mb-[30px] rivales-item-drag bg-green rounded-md flex flex-col justify-between items-center p-1 gap-2 hover:bg-darkGreen cursor-pointer ';
    div.setAttribute('draggable', true);
    div.setAttribute('data-index', index);
    div.setAttribute('data-equipoid', equipo.id);

    // Ajustamos el tamaño y alineación para que todos los ítems tengan el mismo tamaño
    div.style.width = '130px';  // Ancho fijo
    div.style.height = '170px'; // Alto fijo

    // El contenido del ítem
    div.innerHTML = `
        <div class="hidden">X</div>
        <div class="bg-lightGreen flex items-center justify-center rounded-t-md w-full h-24">
            <img src="${equipo.escudo}" alt="escudo" class="w-full h-full object-contain">
        </div>
        <span class="text-white text-sm text-center">${equipo.nombre}</span>
        <div>
            <a href="rivales_form.php?id=${equipo.id}&to=rivales.php">
                <img src="../../assets/imgs/drag-black.png" 
                onmouseover="this.src='../../assets/imgs/drag-white.png'" 
                onmouseout="this.src='../../assets/imgs/drag-black.png'"
                class="w-5" alt="drag icon">    
            </a>
        </div>`;

    return div;
};













