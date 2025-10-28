import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient()

// prisma.$queryRaw`SHOW Tables`.then(console.log);
  
export default prisma

