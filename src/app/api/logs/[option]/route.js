import prisma from "../../../lib/prisma";
export async function GET(request, { params }) {
  const option = params.option;
  const logs = await prisma.log.findMany({ where: { option } });
  return new Response(JSON.stringify(logs), {
    headers: { "Content-Type": "application/json" },
  });
}
