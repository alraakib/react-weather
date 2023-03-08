export function useDataValidation(data) {
  if (!data)
    throw new Promise((Resolve) => {
      data && Resolve();
    });
}

export function parseTime(data) {
  if (!data) return;
  const date = new Date(data);
  return `${
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  }:${date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}`;
}

export function getCurrentDateTime() {
  const monthName = [
    "january",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Spetember",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  const date = d.getDate();
  const month = monthName[d.getMonth()];
  const year = d.getFullYear();
  const hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const ampm = d.getHours() > 12 ? "PM" : "AM";
  return `${date} ${month} ${year} - ${hours}:${minutes}:${seconds} ${ampm}`;
}
