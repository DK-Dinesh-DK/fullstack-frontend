import axios from "axios";

const baseurl = "https://dinesh-motors.onrender.com/";

export const DataRequest = async (method, url, postdata) => {
  var Token = sessionStorage.getItem("token");

  var data = JSON.stringify(postdata);
  var config = {
    method: method,
    url: baseurl + url,
    headers: {
      "Content-Type": "application/json",
      ...(Token ? { token: Token } : {}),
    },
    data: data,
  };
  var res = await axios(config);
  return res;
};
