"use server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req, { params: { id } }) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const token = await prisma.users.findUnique({
      where: {
        id: id,
        token: req.headers.authorization,
      },
    });

    if (!token) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        verify: true,
      },
    });

    return new NextResponse("<p>user verified</p>", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
