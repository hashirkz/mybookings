// contains config and utility functions
const HOST = process.env.REACT_APP_SERVER_HOST;
const PORT = process.env.REACT_APP_SERVER_PORT;


const format_url = ({ host = HOST, port = PORT, endpoint, q = {} }) => {
  let url = `http://${host}:${port}${endpoint}`;

  Object.entries(q).map(([k, v], i) => {
    url += i == 0 ? `?${k}=${v}` : `&${k}=${v}`;
  });
  return url;
};

const format_date = ({
  d,
  options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  },
}) => {
  let date = new Date(d);
  let date_str = date.toLocaleString("en-US", options);

  let formatted = date_str.replace(", ", " ");
  return formatted;
};

const valid_mcgill_email = (email) => {
  const pattern = /[\w.]@(mail.mcgill.ca|mcgill.ca)$/;
  return pattern.test(email);
};

export { format_url, format_date, valid_mcgill_email };