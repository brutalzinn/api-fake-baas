export class CreateUserDto {
    id?: string
    document: string
    name: string
    address: UserAddress
    contact: UserContact
}

export interface UserContact{
    email: string
    phoneNumber: string
}
export interface UserAddress {
  id?: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
  stateCode: string;
}
