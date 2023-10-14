import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiKeyService } from 'src/modules/apikey/apikey.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apikeyService: ApiKeyService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key']; // give the name you want
    const authorization = request.headers["authorization"]
    if(authorization){
      return true
    }
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing.');
    }
    const { ip } = request;
    await this.apikeyService.validate(apiKey, ip)
    return true;
  }
}
