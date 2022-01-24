/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import useSWR from "swr";

export const fetcher_get = function (url) {
  axios.get(url).then((response) => response.data);
};
export const fetcher_post = function (url) {
  return axios.post(url).then((response) => response.data);
};
export const useFetch = (url, type, option) => {
  if (type == "get") {
    return useSWR(url, fetcher_get, option);
  } else if (type == "post") {
    return useSWR(url, fetcher_post, option);
  }
};
