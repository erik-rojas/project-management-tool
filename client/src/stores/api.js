import axios from 'axios'

const hostAPIURL = 'http://localhost:5000/'

function apiCall(url, data) {
  let config = {
    method: 'post',
    url: hostAPIURL + url,
    data: data,
  }
  
  var request = axios(config)
    .then(function (response) {
      return response.data
    });

  return request
}

export const api = (action) => async (dispatch) => {
  let { type, data } = action
  dispatch({
    type: type+'/start',
    data
  })
  let requestURL = type
  const resp = await apiCall(requestURL, action.data)
  console.log('resp = ', resp.data)
  if (resp.data) {
    dispatch({
      type: type+'/success',
      data: resp.data
    })
  }
}
