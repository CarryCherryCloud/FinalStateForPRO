import { Link } from "@solidjs/router";
import useSignUp from "../../hooks/auth/useSignUp";

export default function index() {
    const {
        form,
        handleInput,
        handlePassword,
        handleSignUp,
        loading,
    } = useSignUp();

    return (
        <section>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Username:</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onInput={[handleInput]}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onInput={[handleInput]}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        minlength="8"
                        value={form.password}
                        onInput={[handlePassword]}
                        required
                    />
                </div>
                <button type="submit" disabled={loading()}>
                    <Show
                        when={!loading()}
                        fallback={<span>Pleace wait..</span>}
                    >
                        Sign Up
                    </Show>
                </button>
            </form>
            <div>
                <Link href="/auth/login">
                    Already have an account?
                </Link>
            </div>
        </section>

    );
}

