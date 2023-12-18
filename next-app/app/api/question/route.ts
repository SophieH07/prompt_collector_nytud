import { PrismaClient, Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const {
        prompt
    } = await request.json();
    let insertQuestion: any;
    insertQuestion = {
        prompt: prompt || ''
    }

    await prisma.prompt.create({
        data: insertQuestion
    })
}