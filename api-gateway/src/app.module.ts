import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfig,
      inject: [ApiConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: async () => ({
        path: '/',
        tracing: true,
        uploads: {
          maxFieldSize: 100 * 1000000, // 100MB
          maxFileSize: 50 * 1000000, // 50 MB
          maxFiles: 20,
        },
        playground: true,
        debug: false,
        installSubscriptionHandlers: false,
        autoSchemaFile: true,
        // schemaDirectives: {
        //   upper: UpperCaseDirective,
        // },
        context: ({ req, res, payload, connection }: any) => ({
          req,
          res,
          payload,
          connection,
        }),
        resolverValidationOptions: {
          // requireResolversForResolveType: false,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
