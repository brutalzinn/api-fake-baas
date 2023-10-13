import { ApiProperty } from "@nestjs/swagger"

 class UserContact{
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
}
 class UserAddress {
  @ApiProperty()
  street: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  postalCode: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  stateCode: string;
}

export class CreateUserDto  {
  @ApiProperty()
  document: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: UserAddress;
  @ApiProperty()
  contact: UserContact;
}