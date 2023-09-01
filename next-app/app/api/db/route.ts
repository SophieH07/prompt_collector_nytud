import { PrismaClient, Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'
import { getSession } from "@auth0/nextjs-auth0"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const { user } = await getSession() || {};
    const {
        prompt,
        response
    } = await request.json();
    let insertPrompt: any;
    insertPrompt = {
        email: user?.email || '',
        prompt: prompt || '',
        response: response || '',
    }

    await prisma.prompt.create({
        data: insertPrompt
    })
}