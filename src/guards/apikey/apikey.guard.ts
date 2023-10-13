import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiKeyService } from 'src/modules/apikey/apikey.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apikeyService: ApiKeyService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key']; // give the name you want
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing.');
    }
    const { ip } = request;
    this.apikeyService.validate(apiKey, ip).catch(()=>{
      return false
    })

    return true;
  }
}
