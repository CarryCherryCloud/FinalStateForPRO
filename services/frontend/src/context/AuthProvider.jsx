import { createContext, onMount, Show, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { useNavigate } from "@solidjs/router";

import { Manager } from "socket.io-client";
import { fetchCurrentUser } from "../services/auth.service";


const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export default function AuthProvider(props) {
  const navigate = useNavigate();
  const [store, setStore] = createStore({
    isAuthenticated: false,
    isLoading: false,
    currentUser: null,
    socket: null,
    manager: null,
  });

  onMount(async () => {
    try {
      await loadCurrentUser();
    } catch (error) {
      setStore("isAuthenticated", false);
      setStore("currentUser", null);
    } finally {
      initSocketManager();
      setStore("isLoading", false);
    }
  });

  const loadCurrentUser = async () => {
    try {
      const { data } = await fetchCurrentUser();
      setStore("isAuthenticated", true);
      setStore("currentUser", data.data.username);
    } catch (error) {
      throw error;
    }
  };
  
  const initSocketManager = () => {
    const manager = new Manager(config.API_DOMAIN,{
      withCredentials: true,
    });
    const socket = manager.socket("/");

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });

    setStore("socket", socket);
    setStore("manager", manager);
  };

  const cleanupUserData = () => {
    navigate("/", { replace: true });
    window.location.reload();
  };

  const setCurrentUser = (user) => {
    setStore("isAuthenticated", true);
    setStore("currentUser", user);
  };

  const removeCurrentUser = () => {
    setStore("isAuthenticated", false);
    setStore("currentUser", null);
  };

  return (
    <AuthStateContext.Provider value={store}>
      <AuthDispatchContext.Provider
        value={{
          setCurrentUser,
          removeCurrentUser,
          cleanupUserData,
          loadCurrentUser,
        }}
      >
        <Show when={!store.isLoading} fallback={<div>Wait...</div>}>
          {props.children}
        </Show>
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
