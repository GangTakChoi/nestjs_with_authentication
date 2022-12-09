import {
  IsString,
  MinLength,
  MaxLength,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @Length(4, 24, { message: '아이디는 4자 이상 24자 이하로 입력해주세요.' })
  @Matches(/[a-zA-Z0-9_-]/)
  accountId: string;

  @IsString()
  @MinLength(2, { message: '닉네임은 2자 이상으로 입력해주세요.' })
  @MaxLength(10, { message: '닉네임은 10자 이하로 입력해주세요.' })
  nickname: string;

  // 하나 이상의 문자와 하나의 숫자
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/)
  // 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/)
  // 하나 이상의 대문자, 하나의 소문자 및 하나의 숫자
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/)
  @Length(6, 24, { message: '비밀번호는 6자 이상 18자 이하로 입력해주세요.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/, {
    message: '숫자, 영문자, 특수문자가 포함 필수',
  })
  password: string;
}
