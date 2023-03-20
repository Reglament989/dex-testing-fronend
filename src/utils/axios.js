import axios from "axios";

export const pixpelRequest = axios.create({
  responseType: "json",
});
