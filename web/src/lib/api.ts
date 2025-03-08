import { redirect } from "@sveltejs/kit";
import * as auth from "./stores/auth";

export function logout() {
    auth.logout();
    return redirect(302, '/');
}