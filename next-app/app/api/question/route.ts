import { PrismaClient, Prisma, Source} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const {
        prompt, answer, source
    } = await request.json();

    let generatedAnswer;
    let answerSource;
    
    if (source === 'GPT'){
        generatedAnswer = await answerGPT3(prompt);
        answerSource = Source.GPT3
    } else if (source === 'PULI' ) {
        generatedAnswer = await answerPULI(prompt);
        answerSource =  Source.PULI
    } else {
        answerSource = Source.USER
        generatedAnswer = answer
    }


    let insertQuestion: any;
    insertQuestion = {
        prompt: prompt,
        response: generatedAnswer,
        responseFrom: answerSource
    }

    const inserted = await prisma.prompt.create({
        data: insertQuestion
    })

    return NextResponse.json(inserted)
}


async function answerPULI(prompt: string) {
    try {
        const res = await fetch('http://dl2.nytud.hu:8002/answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "prompt": prompt
            })
        })
        const data = await res.json()
        return data.text
    } catch (e) {
        console.log(e)
    }
    
}

async function answerGPT3(prompt: string) {
    const res = await fetch('http://dl2.nytud.hu:8003/answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": prompt
        })
    })
    const data = await res.json()
    return data.text
}