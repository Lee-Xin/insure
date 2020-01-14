const date = function(t) {
  const time = new Date(t);
  const yyyy = time.getFullYear();
  let MM = +time.getMonth() + 1;
  if (MM < 10) MM = "0" + MM;
  let dd = time.getDate();
  if (dd < 10) dd = "0" + dd;
  return `${yyyy}-${MM}-${dd}`;
};

const month = function(t) {
  const time = new Date(t);
  const yyyy = time.getFullYear();
  let MM = +time.getMonth() + 1;
  if (MM < 10) MM = "0" + MM;
  return `${yyyy}-${MM}`;
};

export default { date, month };
