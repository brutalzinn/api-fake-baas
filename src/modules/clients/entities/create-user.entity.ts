
class UserContact{
  email: string;
  phoneNumber: string;
}
 class UserAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
  stateCode: string;
}

export class CreateUser  {
  document: string;
  name: string;
  address: UserAddress;
  contact: UserContact;
  accountOwnerExternalID?: string
}