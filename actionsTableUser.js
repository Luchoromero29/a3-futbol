$(document).ready(function () {

    // Manejo del botón de eliminación
    $('#delete-button').on('click', function () {
        const userId = $(this).closest('tr').attr('user_id');
        console.log("Holaa");
        
        showDeleteConfirmationModal(userId);
    });

    // Manejo del botón de edición
    $('#users-table tbody').on('click', '.edit-button', function () {
        const userId = $(this).closest('tr').attr('user_id');
        redirectToEditPage(userId);
    });
});

// Función para mostrar el modal de confirmación de eliminación
function showDeleteConfirmationModal(userId) {
    // Lógica para mostrar modal
    $('#deleteModal').modal('show');

    // Al confirmar eliminación
    $('#confirmDelete').on('click', function () {
        deleteUser(userId);
    });
}

// Función para eliminar usuario
function deleteUser(userId) {
    // Hacer la solicitud para eliminar el usuario
    $.ajax({
        url: `/users/${userId}/delete`,
        type: 'DELETE',
        success: function (result) {
            // Eliminar fila de la tabla
            $('#users-table').DataTable().row(`[user_id="${userId}"]`).remove().draw();
            // Mostrar mensaje de éxito o manejar errores
        },
        error: function (error) {
            // Mostrar error
            console.error('Error al eliminar el usuario:', error);
        }
    });
}

// Redirigir a la página de edición
function redirectToEditPage(userId) {
    window.location.href = `/users/${userId}/modify/`;
}
