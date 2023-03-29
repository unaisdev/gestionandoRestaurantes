export const formatearDia = (day: number, month: number, year: number) => {
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
};

export const crearObjetoDate = (timestamp: string) => {};

export const dateToString = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const stringToDate = (date: string) => {
  const [dia, mes, anio] = date.split("/");
  console.log(new Date(Number(anio), Number(mes) - 1, Number(dia)));
  return new Date(Number(anio), Number(mes) - 1, Number(dia));
};

export const hourToString = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};

export const stringToHourDate = (hour: string) => {
  console.log("string to hour", hour);
  const [hours, minutes] = hour.split(":");
  return new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
};

export const getDateMonth = (selectedDate: Date) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthIndex = selectedDate.getMonth();
  const month = months[monthIndex];

  return month.charAt(0).toUpperCase() + month.slice(1);
};

export const getMonthNumber = (selectedDate: Date) => {
  const monthIndex = selectedDate.getMonth();
  const month = (monthIndex < 9 ? "0" : "") + (monthIndex + 1).toString();
  return month;
};

export const translateWeekDay = (str: string) => {
  switch (str) {
    case "Mon":
      return "Lun";
    case "Tue":
      return "Mar";
    case "Wed":
      return "Mier";
    case "Thu":
      return "Jue";
    case "Fri":
      return "Vie";
    case "Sat":
      return "Sáb";
    case "Sun":
      return "Dom";
  }
};

export function compareFestivityDay(date1: Date, date2: Date):boolean {
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear() ?  true : false;
}