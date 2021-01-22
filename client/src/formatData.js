export function formatData(data) {
  const days = data.days.map((item => (
    {date: item.date, grand_total: item.grand_total}
 )));

 return {
    user: data.user,
    range: data.range,
    days: days
 }
}