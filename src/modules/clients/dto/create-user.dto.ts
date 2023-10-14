import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

 class UserContact{
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsPhoneNumber()
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
  @MaxLength(3)
  stateCode: string;
}

export class CreateUserDto  {
  @ApiProperty()
  @MaxLength(15)
  ///is not main objective of this project validate brazilian fields like cpf or cnpj to be used here..
  document: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  address: UserAddress;
  @ApiProperty()
  @IsNotEmpty()
  contact: UserContact;
}