import { PrismaClient, Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const {
        prompt,
        response,
        email
    } = await req.json();
    let insertPrompt: Prisma.Prompt;
    insertPrompt = {
        email: email,
        prompt: prompt || '',
        response: response || '',
    }

    await prisma.prompt.create({
        data: insertPrompt
    })
}