import { IsNumber, IsString, Length } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @Length(5, 5)
  code: string;

  @IsNumber()
  price: number;
}
