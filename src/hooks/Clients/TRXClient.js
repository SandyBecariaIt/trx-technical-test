import { HttpFetchClient } from "../../lib/httpWexClient";

export class ApiError extends Error {
  constructor(message, errorType, httpCode = null, extraContent = null) {
    super(message);
    this.name = "ApiError";
    this.httpCode = httpCode;
    this.errorType = errorType;
    this.extraContent = extraContent;
  }
}

const TRXClient = () => {
  const API_URL = process.env.REACT_APP_URI_API;
  const clientFetch = HttpFetchClient(API_URL);
  
  const getAllInformation = async () => {
    const path = 'api/get-all-info'
    const response = await clientFetch.get(path);
    return response;
  };

  return {
    getAllInformation
  };
};

export default TRXClient;
