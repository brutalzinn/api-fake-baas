import { Injectable } from '@nestjs/common';


@Injectable()
export class SettingsService {

  findAll() {
    return `This action returns all settings`;
  }
}
