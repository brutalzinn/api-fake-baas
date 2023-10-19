import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountOwner } from 'src/modules/account-owner/entities/account-owner.entity';
import { ApiKeyService } from 'src/modules/apikey/apikey.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apikeyService: ApiKeyService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractApiKeyFromHeader(request)
    const authorization = request.headers["authorization"]
    if(authorization){
      return true
    }
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing.');
    }
    const { ip } = request;
    let apiKeyAuthorized = await this.apikeyService.validateAndGetKey(apiKey, ip)
    const payload : AccountOwner = {
      id : apiKeyAuthorized.accountOwnerExternalID
    }
    request['user'] = payload
    return true;
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    const apiKey = request.headers['api-key'];
    return apiKey
  }
}
