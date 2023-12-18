import { PrismaClient, Prisma } from '@prisma/client'
import { NextRequest } from 'next/server'
// import { getSession } from "@auth0/nextjs-auth0"

const prisma = new PrismaClient()

export async function GET(req:NextRequest, res:any) {
    const data = req.body;
    try {
      const result = await prisma.prompt.findMany();
      res.status(200).json(result);
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err: "Error occured." });
    }

    return {
        props: {data}
    }
  };


export async function POST(request: NextRequest) {
    // const { user } = await getSession() || {};
    const {
        suggestion,
        status
    } = await request.json();
    let insertPrompt: any;
    insertPrompt = {
        // email: user?.email || '',
        suggestion: suggestion || '',
        status: status || 0
    }

    await prisma.prompt.create({
        data: insertPrompt
    })
}