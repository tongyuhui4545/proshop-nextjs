'use server';

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation"

// Sign in the user with credentials
export async function signInWithCredentials(_: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) {
        return { success: false, message: "Invalid email or password" }
    }
    if (res?.url) {
        redirect(res?.url);
    }
    return { success: true, message: 'Signed in successfully' }
}

export async function signOutUser() {
    await signOut();
}