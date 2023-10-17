export function parseStrToDate(value: string) {
  if (!value) return null;
  return new Date(parseInt(value.replace('/Date(', '').replace(')/', ''), 10));
}

export function parseStrToDate2(str: string | undefined) {
  if (!str) return;
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(str.replace(pattern, '$3-$2-$1'));
}

export function formateDate(date: Date | undefined, format = 'format1') {
  if (!date) return null;
  let day = `${date.getDate()}`.padStart(2, '0');
  let month = `${date.getMonth() + 1}`.padStart(2, '0');
  let year: string | number = date.getFullYear();
  let hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

  switch (format) {
    case 'format1': {
      const format1 = `${day}.${month}.${year}`;
      return format1;
    }

    case 'format2': {
      year = year.toString().slice(-2);
      const format3 = `${day}.${month}.${year}`;
      return format3;
    }

    case 'format3': {
      const format5 = `${hours}:${minutes}`;
      return format5;
    }

    default:
      break;
  }
}
