"use server";
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";

export async function findAllLogs() {
  return await prisma.log.findMany();
}

export async function getAllUniqueLogDates() {
  const logs = await prisma.log.findMany({
    select: { createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const uniqueDates = [
    ...new Set(logs.map((log) => log.createdAt.toISOString().split("T")[0])),
  ];

  return uniqueDates;
}

export async function getAllLogsByDate() {
  return await prisma.log.findMany({
    select: { option: true, value: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getLogsByDate(dateStr) {
  const selectedDate = new Date(dateStr);
  const nextDate = new Date(selectedDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const logs = await prisma.log.findMany({
    where: {
      createdAt: {
        gte: selectedDate,
        lt: nextDate,
      },
    },
    orderBy: { option: "asc" },
  });

  return logs;
}

export async function submitForm(prevState, formData) {
  try {
    const optionName = formData.get("optionName");
    const inputNumber = formData.get("inputNumber");
    const dateStr = formData.get("date");

    if (!dateStr) throw new Error("Date is required");

    const selectedDate = new Date(dateStr);
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    // Check if log exists for this option and date
    const existingLog = await prisma.log.findFirst({
      where: {
        option: optionName,
        createdAt: {
          gte: selectedDate,
          lt: nextDate,
        },
      },
    });

    if (existingLog) throw new Error("Log already submitted for this date...");

    if (parseFloat(inputNumber) < 0)
      return { message: "Value can't be less than 0", error: true };

    // Create log with createdAt = selectedDate from form
    await prisma.log.create({
      data: {
        option: optionName,
        value: parseFloat(inputNumber),
        createdAt: selectedDate,
      },
    });

    revalidatePath("/add-log");
    return { message: "Log submitted successfully", error: false };
  } catch (error) {
    return { message: error.message || "Submission failed", error: true };
  }
}
