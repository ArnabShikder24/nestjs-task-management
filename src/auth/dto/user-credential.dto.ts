import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "it should be One Uppercase One Lower case one numbe and one special Char",
  })
  password: string;
}