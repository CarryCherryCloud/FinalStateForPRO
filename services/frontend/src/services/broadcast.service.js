export function authBroadcast() {
  const channel = new BroadcastChannel("auth");

  channel.onmessage = (event) => {
    if (event.data === "login_success") {
      window.location.reload();
    }
    if (event.data === "logout_success") {
      window.location.reload();
    }
  };
}
