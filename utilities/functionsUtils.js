export const calcularFecha = (fecha) => {
    const fechaActual = new Date();
    const fechaNueva = new Date(fecha);
    const diferenciaMs = fechaActual - fechaNueva;

    const segundos = Math.floor(diferenciaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);
    const años = Math.floor(dias / 365);

    if (dias < 1) {
        return 'Hoy';
    } else if (dias === 1) {
        return 'Ayer';
    } else if (dias < 7) {
        return `Hace ${dias} días`;
    } else if (semanas < 5) {
        return `Hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
    } else if (meses < 12) {
        return `Hace ${meses} mes${meses > 1 ? 'es' : ''}`;
    } else {
        return `Hace ${años} año${años > 1 ? 's' : ''}`;
    }
};

export const showErrorInput = ($form, field) => {
    const input = $form.querySelector(`[name="${field}"]`);
    input.classList.add("border-2");
    input.classList.add("border-red-400");
}

export const removeErrorInput = ($form, field) => {
    const input = $form.querySelector(`[name="${field}"]`);
    input.classList.remove("border-2");
    input.classList.remove("border-red-400");
    input.classList.add("border-2");
    input.classList.add("border-dark-gray-bg/30");
}

export const showAlert = (label) => {
    document.querySelector("#label-alert").textContent = label
    document.querySelector("#alert").classList.remove("hidden")
    document.querySelector("#alert").classList.add("show")
    setTimeout(() => {
        document.querySelector("#alert").classList.add("hidden")
        document.querySelector("#alert").classList.remove("show")
    }, 2500)
}

export const mostrarSuccessMessage = (label) => {
    $('#msg-success-pr').removeClass('hidden');
    $('#msg-success-pr').text(`${label}`);
    setTimeout(() => ocultarSuccessMessage(), 2500);
} 

export const ocultarSuccessMessage = () => {
    $('#msg-success-pr').addClass('hidden');
}

