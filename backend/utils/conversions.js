export const convertDateToSpanishFormat = (dateInput) => {
  const dateObj = new Date(dateInput);

  // Get day with a leading zero if needed
  const day = dateObj.getDate().toString().padStart(2, "0");

  // Define Spanish month names
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

  // Get the month name (getMonth() returns 0 for January, 1 for February, etc.)
  const month = months[dateObj.getMonth()];

  // Get full year
  const year = dateObj.getFullYear();

  // Format the date as "DD-MMMM-YYYY"
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};
