// format to Jan 12
export function format_date_toMonth(date) {
  return (
    new Date(date).toDateString().split(" ").slice(1).slice(0, 2).join().replace(',', ' ')
  )
}

// format to 2hrs 12min
export function format_toReadable_time(data) {
  let secs = data * 3600;
  let hrs;
  let mins;
  hrs = Math.floor(secs / 3600);
  mins = Math.floor((secs - hrs * 3600) / 60);
  return `${hrs}hrs ${mins}min`
}


export function get_total_time(days) {
  let total_seconds = 0;
    days.map((item) => {
      if(item.grand_total.total_seconds)
        total_seconds +=  item.grand_total.total_seconds
  });
  let hrs;
  let mins;
  hrs = Math.floor(total_seconds / 3600);
  mins = Math.floor((total_seconds - hrs * 3600) / 60);
  return `${hrs}hrs ${mins}min`
}

// format to 2020-01-01
export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
}

