import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('MYSQL_HOST'),
      port: parseInt(this.configService.get('MYSQL_PORT')),
      username: this.configService.get('MYSQL_USERNAME'),
      password: this.configService.get('MYSQL_PASSWORD'),
      database: this.configService.get('MYSQL_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
