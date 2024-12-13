// contains config and utility functions
const HOST = process.env.REACT_APP_SERVER_HOST;
const PORT = process.env.REACT_APP_SERVER_PORT;


const format_url = ({host=HOST, port=PORT, endpoint}) => {
    return `http://${host}:${port}${endpoint}`;
}

export { format_url }