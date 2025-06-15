"use server";
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

export async function findAllLogs() {
  return await prisma.log.findMany();
}

export async function findLog(option) {
  return await prisma.log.findMany({
    where: { option },
  });
}

export async function findLogByOptionAndDate(option, date) {
  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  return await prisma.log.findFirst({
    where: {
      option,
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });
}

export async function submitForm(prevState, formData) {
  try {
    const optionName = formData.get("optionName");
    const inputNumber = formData.get("inputNumber");

    //get all logs based on the option from the form
    const logs = await prisma.log.findMany({
      where: { option: optionName },
    });

    //map over logs to see a log has already been submitted for the day
    logs.forEach((log) => {
      const logDate = log.createdAt.toISOString().slice(0, 10);
      const currentDate = new Date().toISOString().slice(0, 10);

      if (currentDate === logDate) {
        throw new Error("Log already submitted for today...");
      }
    });

    //if not, checks if log value is less than zero
    if (inputNumber < 0) {
      return { message: "Value can't be less than 0", error: true };
    }

    //finally creates log if log has not been created for the day

    await prisma.log.create({
      data: {
        option: optionName,
        value: parseFloat(inputNumber),
      },
    });

    revalidatePath("/add-log");
    return { message: "Log submitted successfully", error: false };
  } catch (error) {
    return { message: error.message || "Submission failed", error: true };
  }
}
