import axios from "axios";

import { authBroadcast } from "./services/broadcast.service"
import AppRouter from "./router"

axios.defaults.baseURL = config.API_DOMAIN;
axios.defaults.withCredentials = true;

export default function App() {
  authBroadcast();
  return (<AppRouter />);
}
