import { createSignal, For } from 'solid-js'
import { A } from "@solidjs/router"
import nav_item_list from '../data/nev_item_list.json'
import useLogout from "../hooks/auth/useLogout";
import { useAuthState } from "../context/AuthProvider";

export function Nav() {
    const [navItem, setNavItem] = createSignal(nav_item_list);
    const authState = useAuthState();
    const { logoutUser } = useLogout();

    return (
        <nav>
            <For each={navItem()}>
                {item => (
                    <A href={item.url} >
                        {item.name}
                    </A>
                )}
            </For>
        
        {!authState.isAuthenticated ? <>
        <A href="/auth/login">Log In</A>
        <A href="/auth/signup">Sign Up</A>
        </> :<button onClick={[logoutUser]}>
            <span>Logout</span>
        </button>}
        </nav>
    );
}