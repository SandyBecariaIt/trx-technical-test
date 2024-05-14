export const HttpFetchClient = (
  baseURL,
  requestInterceptor = request => request,
  responseInterceptor = response => response.data,
  errorHandler = error => Promise.reject(error),
) => {
  const get = async (path) => {
    const response = await instanceResponse(baseURL, path, 'GET');
    return response;
  }

  const instanceResponse = async (baseURL, uri, method) => {
    const request = buildReqest(baseURL, uri, method);
    const response = await fetch(request);
    const data = await response ? response?.json() : {};

    return data;
  }


  const buildReqest = (baseURL, uri,  method) => {
    return new Request(`${baseURL}${uri}`, {
      method: method,
      redirect: 'follow'
    });
  }

  return {
    get,
  }
};