import { createSignal } from "solid-js";
import { useAuthState } from "../../context/AuthProvider";

import { logout } from "../../services/auth.service";


export default function useLogout() {
  const [loading, setLoading] = createSignal(false);
  const authState = useAuthState();
  const channel = new BroadcastChannel("auth");

  async function logoutUser() {
    try {
      setLoading(true);
      const { data } = await logout(authState?.currentUser);
      console.log({ type: "success", message: data.message });
      channel.postMessage("logout_success");
    } catch (error) {
      console.log({ type: "error", message: error.message });
    } finally {
      setLoading(false);
      window.location.reload();
    }
  }

  return {
    logoutUser,
    loading: loading(),
  };
}
