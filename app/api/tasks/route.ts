import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient({});

export async function GET() { 
    const tasks = await prisma.task.findMany({});

    return new NextResponse(JSON.stringify( tasks ), { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const taskCreated = await prisma.task.create({
        data: {
            userId: parseInt(body.userId),
            description: body.description,
        }
    });

    return new NextResponse(JSON.stringify(taskCreated), { status: 201 });
}

export async function DELETE(req: NextRequest,  { params }: { params: { id: string } }) {
    const { id } = params;
    const deletedTask = await prisma.task.delete({
        where: {id : parseInt(id) }
    });

    return new NextResponse(JSON.stringify(deletedTask), { status: 200});
}