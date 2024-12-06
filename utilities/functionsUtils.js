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