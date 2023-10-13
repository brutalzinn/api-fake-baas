import { PartialType } from '@nestjs/swagger';
import { CreateAccountOwnerDto } from './create-account-owner.dto';

export class UpdateAccountOwnerDto extends PartialType(CreateAccountOwnerDto) {}
