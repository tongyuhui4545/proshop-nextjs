'use server';

import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { signUpFormSchema, signInFormSchema, paymentMethodSchema } from "../validator";
import { hashSync } from 'bcrypt-ts-edge'
import { prisma } from '@/db/prisma'
import { formatError } from "@/lib/utils";
import { z } from "zod";

import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/validator"

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

//update the users address

export async function updateUserAddress(data: ShippingAddress) {
    try {
        const session = await auth();

        const currentUser = await prisma.user.findFirst({
            where: { id: session?.user?.id }
        })

        if (!currentUser) throw new Error('User not found');

        const address = shippingAddressSchema.parse(data);

        await prisma.user.update({
            where: { id: currentUser.id },
            data: { address }
        })

        return {
            success: true,
            message: 'User updated successfully',
        }
    } catch (error) {
        return { success: false, message: formatError(error) }
    }
}

//Update user's payment method
export async function updateUserPaymentMethod(data: z.infer<typeof paymentMethodSchema>) {
    try {
        const session = await auth();
        const currentUser = await prisma.user.findFirst({
            where: { id: session?.user?.id }
        });

        if (!currentUser) throw new Error('User not found')

        const paymentMethod = paymentMethodSchema.parse(data);
        await prisma.user.update({
            where: { id: currentUser.id },
            data: { paymentMethod: paymentMethod.type }
        });
        return {
            success: true,
            message: "User updated successfully"
        }
    } catch (error) {
        return { success: false, message: formatError(error) }
    }
}