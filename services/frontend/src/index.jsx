/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";

import App from './App';
import AuthProvider from "./context/AuthProvider";
import GameProvider from "./context/GameProvider";

import './index.scss';

render(
    () => (
        <Router>
            <AuthProvider>
                <GameProvider>
                    <App />
                </GameProvider>
            </AuthProvider>
        </Router>
    ),
    document.getElementById('root')
);
