import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './utils/http.exceptions.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1/api');
  app.useGlobalFilters(new AllExceptionsFilter());

  // swagger documentation
  const config = new DocumentBuilder()
    .setTitle('MMS Backend')
    .setDescription("This is the complete list of all api's for this project")
    .setVersion('1.0')
    .addTag('MMS API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
