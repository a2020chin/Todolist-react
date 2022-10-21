import axios from "axios";
const _url = 'https://todoo.5xcamp.us/users'

export const logIn = (data) => {
  return axios({
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json', 
    },
    method: 'post',
    url: `${_url}/sign_in`,
    data
  });
}

export const signUp = (data) => {
  return axios({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    url: _url,
    data,
  })
}

export const longOut = () => {
  return axios({
    headers: { Accept: 'application/json' },
    method: 'delete',
    url: _url + "/sign_out",
  })
}