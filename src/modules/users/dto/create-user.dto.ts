export class CreateUserDto {
    id?: string
    name: string
    password: string
    email: string
    address: UserAddress
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
