// contains config and utility functions
const HOST = process.env.REACT_APP_SERVER_HOST;
const PORT = process.env.REACT_APP_SERVER_PORT;


const format_url = ({host=HOST, port=PORT, endpoint}) => {
    return `http://${host}:${port}${endpoint}`;
}

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

export { format_url, format_date };