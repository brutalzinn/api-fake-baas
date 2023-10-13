import { PartialType } from '@nestjs/swagger';
import { CreateApikeyDto } from './create-apikey.dto';

export class UpdateApikeyDto extends PartialType(CreateApikeyDto) {}
