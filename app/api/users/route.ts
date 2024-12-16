
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({});

export async function GET() { 
    const user = await prisma.user.findMany()

    return new NextResponse(JSON.stringify( user ), { status: 200 });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const userCreated = await prisma.user.create({
        data: {
            name: body.name,
            createdAt: body.createdAt,
            tasks: body.tasks,
        }
    });

    return new NextResponse(JSON.stringify( userCreated ), { status: 201 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) },
    });

    return new NextResponse(JSON.stringify( deletedUser ), { status: 200 });
}
