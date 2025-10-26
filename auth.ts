import NextAuth from 'next-auth';
import type { NextAuthConfig, User } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' }
            },
            async authorize(credentials: Record<string, unknown> | undefined, _req:Request): Promise<User | null> {
                if (!credentials) return null;

                const email = typeof credentials.email === 'string' ? credentials.email : undefined;
                const password = typeof credentials.password === "string" ? credentials.password : undefined;

                if(!email || !password) return null;

                //Find user in db
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                });

                //Check if user exists and if the password matches
                if (user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password)

                    //If password is correct, return user
                    if (isMatch && user.role) {
                        return {
                            id: user.id,
                            name: user.name ?? null,
                            email: user.email ?? null,
                            image: user.image ?? null
                        }
                    }
                }

                return null
            }
        })
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {
            //Set user id
            session.user.id = token.sub;

            //if there is an update, set user name
            if (trigger === 'update') {
                session.user.name = user.name
            }
            return session
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);