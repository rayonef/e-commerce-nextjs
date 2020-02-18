const baseUrl = process.env.NODE_ENV === "PRODUCTION" 
  ? 'https://deployment-url-now.sh'
  : 'http://localhost:3000/api';

export default baseUrl;