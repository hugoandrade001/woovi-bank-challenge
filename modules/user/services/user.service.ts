import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserService {
  static async createUser(name: string, email: string) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })


    return user
  }

  static async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}

export const createUser = UserService.createUser
