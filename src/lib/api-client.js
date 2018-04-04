import 'whatwg-fetch';
import promise from 'es6-promise';

promise.polyfill();

const HOST = 'http://localhost:4000';
const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

const ApiClient = {
  products() {
    return fetch(`${HOST}/resources`, {
      method: 'GET',
      headers,
    })
    .then((resp) => {
      if (resp.status === 200) return resp.json();
      return false;
    })
    .catch(e => alert(e));
  },
};

export default ApiClient;
