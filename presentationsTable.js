// Datos de ejemplo
const getData = async() => {
    return await fetch('./data.json')
        .then(response => response.json())
        .then(data => data)
}

// mantener el temporizador del mensaje de éxito
let successMessageTimer;
// Para mostrar cantidad de seleccionados
let selectedRowsCount = 0;
// Puse este array que guarda los id de las presentaciones seleccionadas
let selectedRowsArray = []

// mostrar un mensaje en el div de mensaje de éxito
function showSuccessMessage(prName, action) {
    const successMessage = $('#msg-success-pr p');
    switch (action) {
        case 'compartir':
            successMessage.text(`La presentación “${prName}” se compartió correctamente !`);
            break;
        case 'eliminar':
            successMessage.text(`La presentación “${prName}” se eliminó correctamente !`);
            break;
        case 'editar':
            successMessage.text(`La presentación “${prName}” se editó correctamente !`);
            break;
    }
    
    // Ocultar elementos y mostrar el mensaje de éxito
    const addPresentationButton = $('#add-presentation');
    const selectedMessage = $('#selectedMessage');

    $('#msg-success-pr').removeClass('hidden');
    addPresentationButton.addClass('hidden');
    selectedMessage.addClass('hidden');

    // ocultar automáticamente el mensaje después de 5 segundos
    clearTimeout(successMessageTimer);
    successMessageTimer = setTimeout(function () {
        hideSuccessMessage();
    }, 5000);

}

// ocultar el mensaje de éxito
function hideSuccessMessage() {
    clearTimeout(successMessageTimer);
    $('#msg-success-pr').addClass('hidden');

    const selectedMessage = $('#selectedMessage');
    const addPresentationButton = $('#add-presentation');

    if (selectedRowsCount > 0) {
        selectedMessage.removeClass('hidden');
        addPresentationButton.addClass('hidden');
    } else {
        addPresentationButton.removeClass('hidden');
    }
}


async function createPresentationsTable(){

    // Creación DataTable
    const table = $('#pr-table').DataTable({
        "columnDefs": [
            {
                "targets": [0, 2, 3, 4, 5, 6], // Columnas no ordenables
                "orderable": false
            },

            {
                "targets": [0], // primera columna
                "width": "30px"
            },
            {
                "targets": [3, 4, 5], // Columnas actualizado, creado y usuario
                "className": "text-table-gray" // Color gris
            },
            {
                "targets": [1], // Columna id 
                "className": "text-right"
            },
        ],
        "order": [[1, "asc"]], // Columna id
        // Texto opciones de la tabla
        "language": {
            "lengthMenu": "_MENU_ Presentaciones",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Presentaciones",
            "infoEmpty": "Mostrando 0 a 0 de 0 Presentaciones",
            "emptyTable": "No se encontraron presentaciones disponibles",
            "infoFiltered": "(Filtrados de un total de _MAX_ presentaciones)",
            "zeroRecords": "No se encontraron presentaciones con ese nombre",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }, 
        "initComplete": function() {
            // Cursor pointer al dropdown de cantidad de registros para mostrar
            const lengthMenuDropdown = $(this).closest('.dataTables_wrapper').find('.dataTables_length select');
            lengthMenuDropdown.addClass('cursor-pointer');
						//uncomment this on prod
						//calcTableHeaderSize
        }
    });
    
		/*
    const data = await getData()
    
    // Agregar filas de datos a la tabla
    data.forEach(function(item) {
        const row = table.row.add([
            // Botón seleccionar
            `<div class="flex gap-2 items-center">
                <button class="select-button w-5 h-5 border-2 border-lines-color rounded-md hover:border-green">
                    <span class="select-button-content rounded-md">
                        <img src="assets/imgs/tick.png" alt="">
                    </span>
                </button>
                <button class="fav-button w-5 h-5 hover:border-green relative">
                    <svg class="text-lines-color stroke-lines-color fill-current w-5 h-5 hover:!text-green hover:!stroke-green" 
                        viewBox="0 0 36.09 36.09">
                        <path d="M36.04 13.9a1 1 0 0 0-.85-.68l-11.55-1.17-4.68-10.62c-.16-.36-.52-.6-.92-.6s-.75.24-.91.6l-4.68 10.62L.9 13.22a1 1 0 0 0-.57 1.74L9 22.7 6.53 34.05a1 1 0 0 0 1.48 1.07l10.04-5.84 10.03 5.84a1 1 0 0 0 1.48-1.08L27.1 22.7l8.66-7.74a1 1 0 0 0 .28-1.05zm-10.7 7.7a1 1 0 0 0-.32.95l2.1 9.7-8.57-4.99a1 1 0 0 0-1 0l-8.58 4.99 2.1-9.7a1 1 0 0 0-.32-.95l-7.4-6.62 9.88-1a1 1 0 0 0 .81-.59l4-9.08 4 9.08a1 1 0 0 0 .82.6l9.87 1-7.4 6.6z"
                            />
                    </svg>
                    <img class="w-5 h-5 absolute left-0 top-0 hidden" src="assets/imgs/starFill.png" />
                </button>
            </div>`,
            item.Id,
            item.NombrePresentacion,
            item.Usuario,
            item.Creado,
            item.Actualizado, 
    `       <div class="flex gap-2 items-center">
                <a 
                    href="#" 
                    id="pr-table-btn-ver" 
                    class="row-action-button w-7 h-7" 
                    >
                    <img 
                        class="w-7 h-7 bg-black rounded-md border-2 border-gray-bg hover:bg-green" 
                        src="assets/imgs/12 ver hover.png"
                    />
                </a> 
                <a 
                    href="#" 
                    id="pr-table-btn-editar" 
                    class="row-action-button w-7 h-7"
                    onclick="showSuccessMessage('${item.NombrePresentacion}', 'editar')"
                    >
                    <img 
                        class="w-7 bg-green rounded-md border-2 border-gray-bg hover:bg-black" 
                        src="assets/imgs/14 lapiz hover.png"
                    />
                </a> 
                <button onclick="createShareModal('${item.NombrePresentacion}', [ 3, 4, 5, 6 ])" class="row-action-button w-7 h-7">
                    <img 
                        class="w-7 bg-green rounded-md border-2 border-gray-bg hover:bg-black" 
                        src="assets/imgs/16 compartir hover.png"
                    />
                </button> 
                <a 
                    href="#" 
                    id="pr-table-btn-eliminar" 
                    data-toggle="confirmation" 
                    class="row-action-button w-7 h-7"
                    onclick="showSuccessMessage('${item.NombrePresentacion}', 'eliminar')"
                    >
                    <img 
                        class="w-7 bg-green rounded-md border-2 border-gray-bg hover:bg-black" 
                        src="assets/imgs/10 eliminar hover.png"
                    />
                </a>
            </div>`
        ]).draw().node();
        
        // Agregar el atributo pr-id a la fila
        $(row).attr('pr_id', item.Id);
    });

    
		*/
		
    // Boton favorito
    $('#pr-table tbody').on('click', 'button.fav-button', function() {
        const icon = $(this).find('img');
        icon.toggleClass('hidden');
        const row = $(this).closest('tr');
        row.find('td').addClass('!text-black ');
        row.find('td').toggleClass('font-semibold');
        row.find('td:first-child button.select-button').addClass('border-black');
    });

    // Hover sobre las row texto negro
    $('#pr-table tbody').on('mouseenter', 'tr', function() {
        const row = $(this);
        if (row.find('.fav-button img').hasClass('hidden')) {
            row.find('td').addClass('!text-black');
            row.find('td:first-child button.select-button').addClass('border-black');
            row.find('.fav-button svg').addClass('!text-black stroke-black');
        }
    });

    $('#pr-table tbody').on('mouseleave', 'tr', function() {
        const row = $(this);
        if (row.find('.fav-button img').hasClass('hidden')) {
            row.find('td').removeClass('!text-black');
            row.find('td:first-child button.select-button').removeClass('border-black');
            row.find('.fav-button svg').removeClass('!text-black stroke-black');
        }
    });

    //  mostrar u ocultar el mensaje de selección y actualizar el conteo
    function updateSelectedMessage() {
        const selectedMessage = $('#selectedMessage');
        const addPresentationButton = $('#add-presentation');
        const container = $('#add-pr-sel-msgs-container')
    
        if (selectedRowsCount > 0) { // Si hay presentaciones seleccionadas
            selectedMessage.removeClass('hidden');
            addPresentationButton.addClass('hidden');
            $('#msg-success-pr').addClass('hidden');
            container.addClass('!justify-start')
            $('#selectedCount').text(selectedRowsCount);
            if (selectedRowsCount === 1) {
                selectedMessage.find('p').text(selectedRowsCount + ' Seleccionado');
            } else {
                selectedMessage.find('p').text(selectedRowsCount + ' Seleccionados');
            }
        } else {
            container.removeClass('!justify-start')
            selectedMessage.addClass('hidden');
            addPresentationButton.removeClass('hidden');
        }
    }
    
    // Deseleccionar todas las filas
    function deselectAllRows() {
        const rows = $('#pr-table tbody tr');
        rows.removeClass('selected-row');
        selectedRowsCount = 0;
        selectedRowsArray = []
        $('#selectAllButton').removeClass('show-select-button-content');
        updateSelectedMessage();
    }
    
    // Botón X para deseleccionar todo
    $('#deselectAllButton').on('click', function () {
        deselectAllRows();
    });
    
    // Botón seleccionar todas las filas
    $('#selectAllButton').on('click', function () {
        // Seleccionar todas las filas
        const rows = $('#pr-table tbody tr');
    
        if($(this).hasClass('show-select-button-content')){ // Si el botón seleccionar todos ya fue clickeado
            // Eliminar todas las selecciones de esa página
            deselectAllRows()
            updateSelectedMessage();
    
        }else {
            $(this).toggleClass('show-select-button-content');
            const selectedRows = rows.filter(':not(.selected-row)'); // Filtrar filas no seleccionadas
            selectedRows.each(function () {
                const prId = $(this).attr('pr_id');
                selectedRowsArray.push(prId)
            });
            selectedRows.toggleClass('selected-row'); // Seleccionar filas filtradas
            selectedRowsCount += selectedRows.length;
            updateSelectedMessage();
    
        }
    });
    
    // Seleccionar fila button
    $('#pr-table tbody').on('click', 'button.select-button', function() {
        const row = $(this).closest('tr');
        row.toggleClass('selected-row');
        if(row.hasClass('selected-row')){
            selectedRowsCount += 1
            selectedRowsArray.push(row[0].attributes['pr_id'].value)
        }else{
            selectedRowsCount -= 1
            selectedRowsArray = selectedRowsArray.filter(row_id => row_id !== row[0].attributes['pr_id'].value)
        }
        updateSelectedMessage();
    });
    
    //Deseleccionar boton Seleccionar Todos si cambia de página
    $('#pr-table').on( 'page.dt', function () {
        deselectAllRows()
    } );

    const searchInput = $('#pr-table_filter input');

    // Agrega una clase CSS cuando el input tenga contenido
    searchInput.on('input', function () {
        if (this.value.trim() !== '') {
            $(this).addClass('!bg-none');
        } else {
            $(this).removeClass('!bg-none');
        }
    });

    // cerrar el mensaje
    $('#close-success-message').on('click', function () {
        hideSuccessMessage();
    });
}

//fixes error where the table mistakenly resizes upon an empty search. Basically iterates through the elements once the table is ready and then set its width and min width so it wont change. TODO trigger also on resize viewport, probably first recalculate, then resize again. TODO: move it to on load once on the actual site.
function calcTableHeaderSize(){
		
		document.querySelectorAll("#pr-table thead tr th").forEach(function(el){
	//console.log(el);
		//  console.log(el.getBoundingClientRect().width);
			let actualWidth=el.getBoundingClientRect().width;
			el.style.setProperty("width",actualWidth+"px");
			el.style.setProperty("max-width",actualWidth+"px");
	});
}

