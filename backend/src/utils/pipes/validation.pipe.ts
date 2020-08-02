import {
  applyDecorators,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

export function Validation() {
  return applyDecorators(
    UsePipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    ),
  );
}
