import connectToDb, { prisma } from './src/db/connect-to-db'

beforeAll(async () => {
})

afterEach(() => {
})

afterAll(async () => {
  await prisma.$disconnect()
})
