import connectToDb, { prisma } from './src/db/connect-to-db'

beforeAll(async () => {
})

afterEach(() => {
})

afterAll(async () => {
  prisma.mode.deleteMany()
  await prisma.$disconnect()
})
