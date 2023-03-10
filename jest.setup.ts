import connectToDb, { prisma } from './src/db/connect-to-db'

beforeAll(async () => {
})

afterEach(async () => {
  await prisma.genre.deleteMany({})
  await prisma.scale.deleteMany({})
  await prisma.mode.deleteMany({})
  await prisma.composer.deleteMany({})
  await prisma.composition.deleteMany({})
})

afterAll(async () => {
  await prisma.$disconnect()
})
