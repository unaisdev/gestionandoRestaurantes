export const formatearDia = (day: number, month: number, year: number) => {
   return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`
}

export const crearObjetoDate = (timestamp: string) => {

}

export const dateToString = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


export const stringToDate = (date: string) => {
    const [dia, mes, anio] = date.split("/");
    console.log(new Date(Number(anio), Number(mes) - 1, Number(dia)))
    return new Date(Number(anio), Number(mes) - 1, Number(dia));
}

export const hourToString = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export const stringToHourDate = (hour: string) => {
    console.log("string to hour", hour)
    const [hours, minutes] = hour.split(':');
    return new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
}
