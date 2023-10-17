import { PartialType } from "@nestjs/swagger";
import { ClientEntity } from "./client.etity";

export class CreateClientEntity extends PartialType(ClientEntity) {
    accountOwnerExternalID: string
}