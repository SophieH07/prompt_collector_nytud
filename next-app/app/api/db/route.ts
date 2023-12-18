import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const {
        prompt,
        response,
        suggestion,
        status
    } = await request.json();
    let insertPrompt: any;
    insertPrompt = {
        prompt: prompt || '',
        response: response || '',
        suggestion: suggestion || '',
        status: status || 'UNGRADED'
    }

    await prisma.prompt.create({
        data: insertPrompt
    })
}