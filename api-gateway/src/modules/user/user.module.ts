import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserMutationsResolver } from './resolvers/user_mutations.resolver';
import { UserQueriesResolver } from './resolvers/user_queries.resolver';
import { UserService } from './services/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    // Services
    UserService,

    // Resolvers
    UserQueriesResolver,
    UserMutationsResolver,
  ],
  exports: [UserService],
})
export class UserModule {}
