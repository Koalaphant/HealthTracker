import prisma from "../../../../lib/prisma";

export async function GET(request, { params }) {
  const { option, date } = params;
  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);

  const log = await prisma.log.findFirst({
    where: {
      option,
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });

  return new Response(JSON.stringify(log), {
    headers: { "Content-Type": "application/json" },
  });
}
