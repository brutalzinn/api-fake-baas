import { HttpException, HttpStatus } from "@nestjs/common";

export class BusinessException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}