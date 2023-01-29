import { Outlet } from "@solidjs/router";

import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export default function MainLayout() {
    return (
        <div class="container-main">
            <Nav />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
