export class ClientEntity {
  externalId: string
  document: string;
  name: string;
  address?: ClientAddressEntity;
  contact?: ClientContactEntity;
}

export class ClientContactEntity{
  email: string;
  phoneNumber: string;
}

export class ClientAddressEntity {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
  stateCode: string;
}