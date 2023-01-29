import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";

//Main
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const Home = lazy(() => import("../pages/Home"));
const Play = lazy(() => import("../pages/Play"));

//Auth
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));

export default function index() {
    return (
        <Routes>
            <Route path="/" component={MainLayout}>
                <Route path="" component={Home} />
                <Route path="play" component={Play} />
            </Route>
            <Route path="/auth" component={AuthLayout}>
                <Route path="login" component={Login} />
                <Route path="signup" component={SignUp} />
            </Route>
        </Routes >
    );
}
