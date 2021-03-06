import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  const port = +process.env.APP_PORT || 3000;

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Doctors Appointments')
    .setDescription('Doctors Appointments API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Doctors')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(port);
}
bootstrap();
