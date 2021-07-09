import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

const baseUrl = "http://localhost:3030/api/v2/";
export const cookieAuthKey = "SkriveAuth";

export const get = ({ endpoint }) =>
  axios({
    method: "get",
    url: `${baseUrl}${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `OAuth oauth_signature_method="PLAINTEXT",${Cookies.get(
        cookieAuthKey
      )}`,
    },
  })
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });

export const post = ({ payload }) =>
  axios({
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(payload),
    url: `${baseUrl}getpersonaltoken`,
  })
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
