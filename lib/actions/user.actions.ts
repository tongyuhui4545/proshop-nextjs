'use server';

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { signUpFormSchema, signInFormSchema } from "../validator";
import { hashSync } from 'bcrypt-ts-edge'
import { prisma } from '@/db/prisma'
import { formatError } from "@/lib/utils";

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

//Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const plainPassword = user.password;

        user.password = hashSync(user.password, 10);

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });

        await signIn('credentials', {
            email: user.email,
            password: plainPassword
        });

        return { success: true, message: 'User registered successfully' }
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error
        }

        return { success: false, message: formatError(error) }
    }
}

//Get user by the ID
export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({
        where: { id: userId }
    });
    if (!user) throw new Error('User not found');
    return user
}