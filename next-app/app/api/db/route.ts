import { PrismaClient, Source } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PUT(request: NextRequest) {
    const {
        id,
        suggestion,
        status
    } = await request.json();
    let updatePrompt: any;
    updatePrompt = {
        suggestion: suggestion,
        answeredAt: new Date(),
        status: status
    }

    await prisma.prompt.update({
        where: {
            id: Number(id)
        },
        data: updatePrompt
    })
    return NextResponse.json(updatePrompt)
}

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    if (id === null){
        const nextPrompt = await prisma.prompt.findFirst({
            where: {
              suggestion: null,
            },
            orderBy: {
              id: 'asc',
            },
          })
          return NextResponse.json(nextPrompt)
    }
    const prompt = await prisma.prompt.findUnique({
        where: {
            id: Number(id)
        }
    })
    return NextResponse.json(prompt)
}
