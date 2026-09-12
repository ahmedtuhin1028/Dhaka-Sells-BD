import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_SEED_PASSWORD; 
  if (!adminPassword) throw new Error('ADMIN_SEED_PASSWORD not set');

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { phone: '01576547128' }, // Unique identifier
    update: {},
    create: {
      name: 'Mursalin',
      email: 'admin@dhakasells.bd',
      phone: '01576547128',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log({ admin });
}
main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
