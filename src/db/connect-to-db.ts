import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export default async (dbUrl = process.env.DATABASE_URL) => {
  if(!dbUrl) {
    console.error('No db connection string provided')
    return
  }
  try {
    const db = await prisma.$connect()
    console.log(`Connected to postgres db`)
    return db
  } catch(err) {
    console.error('Error connecting to db')
    console.error(err)
  }
}
