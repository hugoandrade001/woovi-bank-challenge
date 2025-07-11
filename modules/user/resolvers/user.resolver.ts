// apps/server/modules/user/resolvers/user.resolver.ts

import { UserService } from '../services/user.service'
import { UserType } from '../types/user.type'
import { GraphQLString, GraphQLNonNull } from 'graphql'

export const userResolver = {
  Mutation: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_: unknown, args: { name: string; email: string }) => {
        const { name, email } = args
        const user = await UserService.createUser(name, email)
        return user
      },
    },
  },
}
