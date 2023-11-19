import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MoneyWise API Documentation')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        name: 'JWT Access Token',
        description: 'Enter access token',
        in: 'header',
        type: 'http',
      },
      'JWT Access Token',
    )
    .addBearerAuth(
      {
        name: 'JWT Refresh Token',
        description: 'Enter refresh token',
        type: 'http',
      },
      'JWT Refresh Token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
