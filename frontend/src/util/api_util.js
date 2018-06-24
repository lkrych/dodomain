const buildRequestHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${sessionStorage.token}`);
  return headers;
};

// buildurl is used by the fetchResources function to create the queryString
// that will determine what resources are fetched from the back end

export const buildUrl = (resource, sortObject) => {
  let url = '/' + resource + '?';
  let sortParams = Object.keys(sortObject);
  sortParams.forEach((key, idx) => {
    if (sortObject[key] === null) { // catch bad data
      url = url + key + '=';
      url += '&';
    } else {
      if (typeof sortObject[key] === "object")
        url = url + key + '=' + JSON.stringify(sortObject[key]);
      else
        url = url + key + '=' + sortObject[key];
        url += '&';
    }
  });

  return url;
};

export const signUp = (user) => {
  const headers = buildRequestHeaders();
  return fetch('/signup', {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify({user})
    }).then(response => {
     return response.json();
    }).then(json => {
    if(json.auth_token){
      sessionStorage.setItem('token', json.auth_token);
    }
    return json;
  });
};

export const login = (user) => {
  const headers = buildRequestHeaders();
  return fetch('/auth', {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify({user})
    }).then(response => {
     return response.json();
    }).then(json => {
    if(json.auth_token){
      sessionStorage.setItem('token', json.auth_token);
    }
    return json;
  });
};

export const fetchDomains = (sortState) => {
  const headers = buildRequestHeaders();
  let url = buildUrl('domains', sortState);
  return fetch(`${url}`, {
    method: 'GET',
    credentials: 'include',
    headers: headers
    }).then(response => {
     return response.json();
  });
};

export const submitDomain = (domain) => {
  const headers = buildRequestHeaders();
  return fetch('/domains', {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(domain)
    }).then(response => {
     return response.json();
  });
};