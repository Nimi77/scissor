import { sql } from "@vercel/postgres";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn: "/login"
    },
    providers:[
        CredentialsProvider({
            credentials:{
                email: {},
                password: {}
            },
            async authorize(credentials, req){
                const response = await sql `
                SELECT = FROM users WHERE email = ${credentials?.email}`
                const user = response.rows[0]

                const isPasswordCorrect = await compare(
                    credentials?.password || '',
                    user.password
                )
                
                if(isPasswordCorrect){
                    return{
                        id: user.id,
                        email: user.email
                    };
                }
                //return null if user data cannot be retrieved 
                return null
            }
        })
    ]
})
export {handler as GET, handler as POST}