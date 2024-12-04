

/**
 * Esta función le agrega el toggle del tick a la busqueda de usuarios
 * Se tiene que hacer a través de una función porque cada vez que se cierra y abre 
 * el modal, se agrega como dos veces la funcion y funciona mal
 */
function addEventHandlers() {

    // Función para abrir/cerrar el dropdown con el botón que dice Listo en share modal
    $('#ready-share-btn').on('click', function(){
        if($("#users-share-container").hasClass('hidden')){
            closeShareModal();
            // Mensaje que se compartió correctamente
            showSuccessMessage($('#pr-name-span').text(), 'compartir');
        }else{
            $("#share-modal, #close-modal-btn").toggleClass("!bg-lightGrayBg");
            $("#users-w-permissions-container").toggleClass("hidden");
            $("#users-share-container").toggleClass("hidden");
            $('#compartir-mode-title').text('Compartido')
            $(this).text('Listo')
        }
    })

    // Abrir pestaña de agregar usuarios
    $('#open-users-share-table').on('click', function(){
        $("#users-w-permissions-container").toggleClass("hidden");
        $("#users-share-container").toggleClass("hidden");
        $("#share-modal, #close-modal-btn").toggleClass("!bg-lightGrayBg");
        $('#compartir-mode-title').text('Compartir')
        $('#ready-share-btn').text('Agregar')
    })

}

// Trackear nuevos usuarios agregados (se agregan usuarios con 
// acceso previo para enviar una lista nueva actualizada)
// Cuando se envie a la api los nuevos usuarios, si los usuarios
// en newUsersAdded son igual que los de oldUsersWithPermissions
// significa que no se agregaron ni eliminaron usuarios, entonces no debería hacerse la petición
// ni se retornaría la lista newUsersAdded proque sería innecesario
const newUsersAdded = new Set()
// Trackear usuarios agregados antes
let oldUsersWithPermissions = []

// Desde la tabla de presentaciones, el botón compartir llama a crear el modal
// Se le debería pasar el nombre de la presentación y un array de ids con
// usuarios con acceso
async function createShareModal (prName, usersWithPermissions) {
    oldUsersWithPermissions = usersWithPermissions
    usersWithPermissions.forEach(user => newUsersAdded.add(parseInt(user)))
    // Modal container y efecto de blur
    const modal = $('#share-modal')
    const blurBg = $('#blur-background-div')
    
    modal.toggleClass('hidden')
    blurBg.toggleClass('hidden')

    // Nombre de la presentación
    const prNameSpan = modal.find('#pr-name-span');

    // Agregar nombre presentación
    prNameSpan.text(prName);

    // Hover boton cerrar
    $('#close-modal-btn').hover(
        function() {
            // Cuando se pasa el mouse por encima
            const img = $(this).find('img');
            const hoverSrc = img.attr('data-hover-src');
            img.attr('src', hoverSrc);
        },
        function() {
            // Cuando se quita el mouse
            const img = $(this).find('img');
            const originalSrc = img.attr('original-src');
            img.attr('src', originalSrc);
        }
    );

    // Se llama a la función que agrega el onCLick
    addEventHandlers()

    // Se le tendría que pasar los id de los usuarios que tienen permiso
    await createUsersWithPermissionsTable(usersWithPermissions)
    await createUsersShareTable(usersWithPermissions)


}

// Creo esta dunción para que cuando se cierre el modal se reinicie todo
async function closeShareModal (){
    const modal = $('#share-modal')
    modal.toggleClass('hidden')
    const blurBg = $('#blur-background-div')
    blurBg.toggleClass('hidden')
    
    // Se eliminan los datos de las tablas
    $('#users-share-table').DataTable().rows().remove()
    $('#users-w-permissions-table').DataTable().rows().remove()
    $('#users-share-table').DataTable().destroy();
    $('#users-w-permissions-table').DataTable().destroy();

    // Se borra el borde de la tabla de búsqueda 
    $('#users-share-table').addClass('border-0')
    // borro la funciones de los onClick para que no se añadan dos veces y funcionen mal
    $('#users-share-table tbody').off('click', 'button.select-button'); 
    $('#ready-share-btn').off('click')
    $('#open-users-share-table').off('click')
    $('#close-users-share-table').off('click')
    // Volver a pestaña usuarios con acceso
    $("#users-w-permissions-container").removeClass("hidden");
    $("#users-share-container").addClass("hidden");
    $("#share-modal, #close-modal-btn").removeClass("!bg-lightGrayBg");
    $('#compartir-mode-title').text('Compartido')
    $('#ready-share-btn').text('Listo')
    newUsersAdded.clear()
}

// Función para añadir o eliminar a usuario de los newUsersAdded
function handleUserAddDelete(userId){
    // Obtener mensaje de información de la acción que se está realizando
    // 'Nuevo usuario asignado' o 'Quitando acceso a usuario'
    const usersWPermissionsTable = $('#users-w-permissions-table');
    const targetRow = usersWPermissionsTable.find('tr[user_w_permissions_id="' + userId + '"]');
    const infoMsg = targetRow.find('#user-added-msg')

    // Añadir usuario
    if(!newUsersAdded.has(userId)){
        newUsersAdded.add(userId)
        // Nuevo usuario asignado, se muestra el mensaje 'Nuevo usuario asignado' 
        // (no se incluye en los usuarios con acceso previo)
        if(!oldUsersWithPermissions.includes(userId)){
            infoMsg.removeClass('hidden')
        }else{ 
            // Si el usuario ya estaba previamente con acceso
            // no se muestra el mensaje 'Quitando acceso a usuario'
            infoMsg.addClass('hidden')
        }
    }else{ // Eliminar usuario
        newUsersAdded.delete(userId)
        // Si el usuario ya estaba previamente con acceso
        // se muestra el mensaje 'Quitando acceso a usuario'
        if(oldUsersWithPermissions.includes(userId)){
            infoMsg.removeClass('hidden')
        }else{
            // Nuevo usuario que fue asignado se le borró el permiso, 
            // no se muestra el mensaje 'Nuevo usuario asignado'
            // (No tenía acceso, se le dió el acceso pero se deselecciono su celda)
            infoMsg.addClass('hidden')
        }
    }
}

// Crear tabla de usuarios con acceso
async function createUsersWithPermissionsTable(usersWithPermissions){

    // Búsqueda por nombre y email por primeras letras
    $.fn.dataTable.ext.search.push(function (settings, data) {
        // Obtener el ID de la tabla actual
        const tableId = settings.sTableId;

        // Verificar si la tabla es #users-w-permissions-table
        if (tableId === 'users-w-permissions-table') {
            // Obtener valor de búsqueda
            const searchTerm = $('#users-w-permissions-table_filter input[type="search"]').val().trim().toLowerCase();
            // Borrar los espacios de el texto dentro de la segunda columna de la tabla para obtener nombre y email
            // Borrar texto de Añadir a lista y eliminar de la lista
            let dataArr = data[1].trim().split(/\s+/).filter(word => word.length > 0);

            // Si se retorna true, se muestra la row en la búsqueda
            if (searchTerm === '') { // Si no se busca nada, no se retorna nada
                return true;
            }

            // Si la búsqueda coincide con primeras letras de nombre, apellido o email se retorna
            if (dataArr[0].toLowerCase().startsWith(searchTerm) || dataArr[1].toLowerCase().startsWith(searchTerm) || dataArr[3].toLowerCase().startsWith(searchTerm)) {
                return true;
            }
            return false
        }

        // Si no es la tabla #users-share-table, no se aplica la búsqueda custom
        return true;
    });


    // Creación DataTable
    const tableWithPermissions = $('#users-w-permissions-table').DataTable({
        "columnDefs": [
            {
                "targets": [0, 1], // Columnas no ordenables
                "orderable": false
            },
            {
                "targets": [-1],
                "className": "hidden"
            },
            {
                "targets": [0],
                "className": "w-12"
            },
        ],
        "bInfo": false, // Ocultar el pie de tabla,
        "bLengthChange": false, // Ocultar el dropdown de cantidad de elementos a mostrar,
        "paging": false,
        "initComplete": function () { // Ocultar thead
            $(this).find('thead').hide();
            $(this).removeClass('no-footer');
        },
        "language": {
            "emptyTable": "No hay usuarios con permisos",
            "zeroRecords": "No hay usuarios con ese nombre o email",
            "search": `<img class="h-4 w-4 inline " src="assets/imgs/6 LupaB.png" alt="">`,
            "searchPlaceholder": "Buscar usuarios"
        },
    });

    // Agregar filas de datos a la tabla 
    // En caso de que un usuario que tenía acceso previamente se deseleccione, que se muestre
    // que se le está quitando el acceso (la tabla se dibuja varias veces usando newUsersAdded)
    // Si un usuario que tenía acceso se deselecciona, se borra de newUsersAdded (trackea también usuarios con acceso previo)
    // por la función handleUserAddDelete
    // Pero queremos mostrar que se le está quitando el acceso, no borrarlo de la tabla
    const usersToShow = oldUsersWithPermissions.filter(id => !usersWithPermissions.includes(id));
    // Agregar ids de usuarios con acceso previio borrados para mostrarlos en la tabla
    usersWithPermissions = usersWithPermissions.concat(usersToShow);

    shareUsers.filter(user => usersWithPermissions.includes(user.id) ).forEach(function(user) {
        const role = roles.find((r) => r.id === user.role)
        // Boolean para mostrar mensaje 'Nuevo usuario asignado' (si es false, 
        // se está dando acceso a un nuevo usuario)
        // o 'Quitando acceso a usuario' (si es true, usuario que se le está quitando
        // el acceso asignado previamente)
        const userHasAccess = oldUsersWithPermissions.includes(user.id)
        // Usuario con acceso previo deseleccionado
        const isOldUserDeselected = userHasAccess && !newUsersAdded.has(user.id)
        const showMsg = !userHasAccess || isOldUserDeselected

        const row = tableWithPermissions.row.add([
            // Botón seleccionar
            `<div class="flex gap-2 items-center justify-center">
                <button class="select-button w-4 h-4 border-2 rounded-md hover:border-green">
                    <span class="select-button-content rounded-md ">
                        <img 
                            src="assets/imgs/3.png"
                            alt="">
                    </span>
                </button>
            </div>`,
            `<div class="flex items-center gap-3 max-w-[500px]">
                <img class="w-7 h-7 rounded-full border-2 border-green" src="${user.image}" />
                <div id="text-row-users-w-permissions" class="flex flex-col items-start text-black ${userHasAccess ? '' : 'text-green'}">
                    <p class="font-bold">
                        ${user.name} 
                        <span class="font-normal text-green">
                            (${role.name})
                        </span>
                        <span id="user-added-msg" class="font-normal text-white bg-green rounded-md ml-1 py-0.5 px-1 ${showMsg ? "" : "hidden"} ">
                            ${userHasAccess ? 'Sin acceso' : 'Nuevo usuario añadido'}      
                        </span>
                    </p>
                    <p>${user.email}</p>
                </div>
            </div>`,
            role.id
        ]).draw().node()

        $(row).attr('user_w_permissions_id', user.id);
        // Añadir solo la clase selected row si es un usuario con acceso previo
        // que está seleccionado o es un usuario que se le está otorgando el permiso
        // en ese momento
        if(!isOldUserDeselected || !userHasAccess){
            $(row).addClass('selected-row selected-row-share')
        }
        $(row).find('.select-button').removeClass('hover:border-green')
    });

    /**
     * Estilos y funcionamiento de las row
     */

    // Seleccionar fila button
    $('#users-w-permissions-table tbody').on('click', 'button.select-button', function() {
        const row = $(this).closest('tr');
        const userId = row[0].attributes['user_w_permissions_id'].value
        // Agregar o eliminar al usuario de los usuarios con permiso
        handleUserAddDelete(parseInt(userId))
        // Row con text verde 
        row.toggleClass('selected-row selected-row-share');

        // toggle de class selected row de rows de la otra tabla (users-share-table) 
        // para seleccionar/deseleccionar rows en caso de que se seleccione o
        // deseleccione rows de #users-w-permissions-table
        const usersShareTable = $('#users-share-table');
        const targetRow = usersShareTable.find('tr[user_share_id="' + userId + '"]');
   
        const textContainer = row.find('#text-row-users-w-permissions')
        const imgProfile = row.find('img')
        if(row.hasClass('selected-row')){
            targetRow.addClass('selected-row')
            targetRow.addClass('selected-row-share')
            $(this).removeClass('hover:border-green')
  
            textContainer.removeClass('text-gray-400');
            textContainer.find('span:not(#user-added-msg)').removeClass('text-gray-400')
       
            imgProfile.removeClass('grayscale');
        }else{
            // Eliminar usuario de la tabla si es un usuario que 
            // se estaba dando el acceso en el momento (antes no tenía acceso y se borra
            // de la tabla de usuarios con acceso)
            if(!oldUsersWithPermissions.includes(parseInt(userId))){
                tableWithPermissions.row(row).remove().draw()
            }

            textContainer.find('span:not(#user-added-msg)').addClass('text-gray-400')
            textContainer.addClass('text-gray-400');
      
            imgProfile.addClass('grayscale');

            targetRow.removeClass('selected-row')
            targetRow.removeClass('selected-row-share')
            $(this).addClass('hover:border-green')
        }
    });

    // Hover para cambio de tick en botones celda en las tr con la clase selected-row
    $('#users-w-permissions-table').on('mouseenter', 'tr.selected-row .select-button', function() {
        // Cuando el mouse entre en la celda
        // cambiar la imagen al hover
        $(this).find('.select-button-content img').attr('src', 'assets/imgs/tick.png');
    }).on('mouseleave', 'tr.selected-row .select-button', function() {
        // Cuando el mouse salga de la celda
        // Restaurar la imagen original
        $(this).find('.select-button-content img').attr('src', 'assets/imgs/3.png');
    });
    // Cambiar la imagen al hacer clic en el botón mientras el mouse está clickeando
    // Se agrega esto porque si uno clickea, al no hacerse todavía el mouseleave
    // se muestra la imagen anterior con fondo en verde y no negro
    $('#users-w-permissions-table').on('mousedown', 'tr .select-button', function() {
        $(this).find('.select-button-content img').attr('src', 'assets/imgs/tick.png');
    })

    // Hover sobre las row colores de fondo
    $('#users-w-permissions-table tbody').on('mouseenter', 'tr', function() {
        const row = $(this);
        if(row.hasClass('selected-row')){
            row.find('td').addClass('!bg-white');
        }else {
            row.find('td').addClass('!bg-emerald-50');
        }
    });

    $('#users-w-permissions-table tbody').on('mouseleave', 'tr', function() {
        const row = $(this);
        row.find('td').removeClass('!bg-emerald-50 !bg-white');
    });

}

async function createUsersShareTable(usersWithPermissions){
     // Búsqueda por nombre y email por primeras letras
     $.fn.dataTable.ext.search.push(function (settings, data) {
        // Obtener el ID de la tabla actual
        const tableId = settings.sTableId;
    
        // Verificar si la tabla es #users-share-table
        if (tableId === 'users-share-table') {
            // Obtener valor de búsqueda
            const searchTerm = $('#users-share-table_filter input[type="search"]').val().trim().toLowerCase();
            // Borrar los espacios de el texto dentro de la segunda columna de la tabla para obtener nombre y email
            // Borrar texto de Añadir a lista y eliminar de la lista
            let dataArr = data[0].trim().split(/\s+/).filter(word => word.length > 0);
            // dataArr = dataArr.splice(dataArr.indexOf('acceso') + 1, dataArr.length - 1)
    
            // Si se retorna true, se muestra la row en la búsqueda
            if (searchTerm === '') { // Si no se busca nada, no se retorna nada
                return true;
            }
    
            // Si la búsqueda coincide con primeras letras de nombre, apellido o email se retorna
            if (dataArr[0].toLowerCase().startsWith(searchTerm) || dataArr[1].toLowerCase().startsWith(searchTerm) || dataArr[3].toLowerCase().startsWith(searchTerm)) {
                return true;
            }
            return false
        }
    
        // Si no es la tabla #users-share-table, no se aplica la búsqueda custom
        return true;
    });

    // Creación DataTable
    const table = $('#users-share-table').DataTable({
        "columnDefs": [
            {
                "targets": [0, 1], // Columnas no ordenables
                "orderable": false
            },
            {
                "targets": [-1],
                "className": "hidden"
            },
            {
                "targets": [0],
                "className": "w-12"
            }
        ],
        "order": [[1, "asc"]], // Columna nombre usuario
        "paging": false,
        // Texto opciones de la tabla
        "language": {
            "emptyTable": "No se encontraron usuarios disponibles",
            "zeroRecords": "No se encontraron usuarios",
            "search": `<img class="h-7 w-7 inline ml-1" src="assets/imgs/6 Lupa.png" alt="">`,
            "searchPlaceholder": "Buscar usuarios"
        },
        "bInfo": false, // Ocultar el pie de tabla,
        "bLengthChange": false, // Ocultar el dropdown de cantidad de elementos a mostrar
        "initComplete": function () { // ocultar thead
            $(this).find('thead').hide();
            $(this).removeClass('no-footer');
        }
    });


    // Agregar filas de datos a la tabla (usuarios que no tienen permiso)
    shareUsers.filter(user => !usersWithPermissions.includes(user.id)).forEach(function(item) {
        // Mostrar role del usuario
        const role = roles.find((r) => r.id === item.role)
        let roleName = role.name

        const row = table.row.add([
            
            // Botón seleccionar
            `
            <div id="${item.id}-add-delete-btn-user" class= "flex items-center gap-3 relative w-full pl-4">
                <button class="select-button w-4 h-4 border-2 border-grayBg rounded-md hover:border-green">
                    <span class="select-button-content rounded-md">
                        <img src="assets/imgs/3.png" alt="">
                    </span>
                </button>
                <img class="w-7 h-7 rounded-full border-2 border-green ml-1" src="${item.image}" />
                <div 
                    class="flex flex-col justify-center items-start text-black max-w-[350px] hover:text-green cursor-pointer">

                    <p class="font-bold">
                        ${item.name} 
                        <span class="font-normal text-green"> 
                            (${roleName})
                        </span>
                    </p>
                    <p class="break-all">${item.email}</p>
                </div>   
            </div>
            `,
            role.id,
            
        ]).draw().node();
        
        $(row).attr('user_share_id', item.id);
        $(row).addClass('relative')

    });
    
    // Los roles por los que se está filtrando
    const selectedRoles = new Set();
    
    // Bototnes de filtro por rol
    // Para encontrar roles que no tenga ningun usuario
    function findRolesWithoutUsers(selectedRoles) {
        const rolesWithoutUsers = new Set();
        const usersData = shareUsers.filter(user => !usersWithPermissions.includes(user.id))
        for (const roleId of selectedRoles) {
            // Verifica si ningún usuario tiene el rol 
            const noUserHasRole = usersData.every((user) => user.role !== roleId);
    
            if (noUserHasRole) {
                // Agrega el rol 
                rolesWithoutUsers.add(roleId);
            }
        }
        return rolesWithoutUsers;
    }

    // Hover sobre las row texto negro
    $('#users-share-table tbody').on('mouseenter', 'tr', function() {
        const row = $(this);
        row.find('td').addClass('!bg-emerald-50');
    });

    $('#users-share-table tbody').on('mouseleave', 'tr', function() {
        const row = $(this);
        row.find('td').removeClass('!bg-emerald-50');
    });
    
    // Función para añadir o eliminar a usuario de los usuarios con acceso
    function updateTablaUsersWPermissions(){

        // Refrescar tabla con nuevos usuarios
        $('#users-w-permissions-table').DataTable().clear().destroy();
        $('#users-w-permissions-table tbody').off('click', 'button.select-button'); 
        createUsersWithPermissionsTable(Array.from(newUsersAdded));
    }

    // Seleccionar fila button
    $('#users-share-table tbody').on('click', 'button.select-button', function() {
        const row = $(this).closest('tr');
        const id = row.attr('user_share_id')
        // Row con text verde 
        row.toggleClass('selected-row selected-row-share');
        // Ahora, selecciona la fila en la otra tabla

        handleUserAddDelete(parseInt(id))
        updateTablaUsersWPermissions()
    });

    // Trackear los usuarios que fueron seleccionados por rol, porque si
    // uno deselecciona el rol, se deseleccionan los usuarios que tenían ese rol
    // pero si yo tenía un usuario seleccionado previamente, puede que se deseleccione también
    // Por lo que seguimos los usuarios que se seleccionaron por el rol
    const usersSelectedByRole = new Set()
    // Seleccionar usuarios por rol
    $('[id$="-share-filter"]').on('click', function () { // Botón de filtro de rol
        const div = $(this).closest('div'); // div contenedor
        const roleName = this.id.split('-')[0]; // name del rol guardado en el id del botón ({roleName}-share-filter)
        const notUsersWithRoleMsg = $(this).siblings('div').find('#not-users-w-role')
        const {id: roleId} = roles.find((r) => r.name.toLowerCase() === roleName); // obtener id del rol 
        
        // Seleccionar los usuarios por rol
        function selectUsersByRoleSelected(){
            table.rows().every(function () {
                const rowData = this.data();
                const rowRoleId = rowData[1]; 
                
                if (selectedRoles.has(rowRoleId)) {
                    const userShareId = $(this.node()).attr('user_share_id');
                    if(!newUsersAdded.has(userShareId)){
                        // Agregar usuario a usuarios seleccionados por rol
                        // si no han sido seleccionados previamente de manera individual
                        usersSelectedByRole.add(userShareId); 
                    }
                    $(this.node()).addClass('selected-row selected-row-share');
                }
            });
        }

        // mDeseleccionar usuarios por rol
        function unselectUsersByRoleUnSelected(roleId){
            const usersToUnselect = new Set()
            table.rows().every(function () {
                const rowData = this.data();
                const rowRoleId = rowData[1]; 
                
                if (rowRoleId === roleId) {
                    const userShareId = $(this.node()).attr('user_share_id');
                    usersSelectedByRole.delete(userShareId); 
                    if(newUsersAdded.has(parseInt(userShareId))){
                        usersToUnselect.add(userShareId)
                    }
                    $(this.node()).removeClass('selected-row selected-row-share');
                }
            });
            return usersToUnselect
        }

        // Toggle clase 'selected-row-share' en el div
        div.toggleClass('selected-row-share');
        let roleHaveUsers 
        if (div.hasClass('selected-row-share')) {
            selectedRoles.add(roleId); // Si se hizo click en el botón, añadir a los roles seleccionados
            // Verificar si hay usuarios que tengan el rol seleccionado
            roleHaveUsers = !findRolesWithoutUsers(selectedRoles).has(roleId)
            if(!roleHaveUsers){
                // Mostrar el mensaje de que no hay usuarios con ese rol
                notUsersWithRoleMsg.removeClass('hidden')
            }else {
                // Seleccionar usuarios
                selectUsersByRoleSelected()
            }
            // Por cada usuario seleccionado por rol, añadirlo a la otra tabla
            usersSelectedByRole.forEach(id => {
                if(!newUsersAdded.has(parseInt(id))){
                    handleUserAddDelete(parseInt(id))
                }
            })
            // Update de la tabla de usuarios con acceso
            updateTablaUsersWPermissions()
        } else {
            selectedRoles.delete(roleId); // Se deseleccionó el filtro de rol
            // Deseleccionar usuarios que fueron seleccionados por rol
            // Excepto los seleccionados previamente de manera individual
            const usersToUnselect = unselectUsersByRoleUnSelected(roleId)
            // Deseleccionar usuarios que fueron seleccionados por rol
            usersToUnselect.forEach(id => {
                handleUserAddDelete(parseInt(id))
            })
            // Update de la tabla de usuarios con acceso
            updateTablaUsersWPermissions()
            notUsersWithRoleMsg.addClass('hidden')
        }
        
    });

}
