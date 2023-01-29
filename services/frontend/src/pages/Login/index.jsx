import { Link } from "@solidjs/router";
import useLogin from "../../hooks/auth/useLogin";

export default function index() {
    const { form, handleInput, handleForm } = useLogin();

    return (
        <section>
            <form onSubmit={handleForm}>
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
                        onInput={[handleInput]}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div>
                <Link href="/auth/signup">
                    Not have an account?
                </Link>
            </div>
        </section>
    );
}

