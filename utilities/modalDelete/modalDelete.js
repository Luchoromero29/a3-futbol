export const showModal = (titleText, confirmText, cancelText, onConfirm, onCancel) => {
    // Seleccionamos los elementos dinámicos del modal
    const modal = document.getElementById('deleteModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalCancel = document.getElementById('modalCancel');


    // Cambiamos los textos dinámicos
    modalTitle.textContent = titleText;
    modalConfirm.querySelector('p').textContent = confirmText;
    modalCancel.querySelector('p').textContent = cancelText;

    // Mostramos el modal
    modal.classList.remove('hidden');

    // Removemos cualquier event listener previo para evitar duplicación
    modalConfirm.replaceWith(modalConfirm.cloneNode(true));
    modalCancel.replaceWith(modalCancel.cloneNode(true));

    // Volvemos a seleccionar los botones después del clon
    const newModalConfirm = document.getElementById('modalConfirm');
    const newModalCancel = document.getElementById('modalCancel');

    // Asignamos nuevas funciones de callback
    newModalConfirm.addEventListener('click', () => {
        if (onConfirm) onConfirm();
        modal.classList.add('hidden');
    });

    newModalCancel.addEventListener('click', () => {
        if (onCancel) onCancel();
        modal.classList.add('hidden');
    });
};
