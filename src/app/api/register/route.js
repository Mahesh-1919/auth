"use server";
import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (req, res) => {
  const { name, email, password, token } = await req.json();

  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return new NextResponse("User already exists", {
        status: 400,
      });
    } else {
      const newUser = await prisma.users.create({
        data: {
          email,
          password,
          name,
          token,
        },
      });

      const verifyLink =
        "https://auth.smdev.me/api/register/" + newUser.id + "?token=" + token;

      return new NextResponse(JSON.stringify({ ...newUser, verifyLink }), {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error.message), {
      status: 500,
    });
  }
};
