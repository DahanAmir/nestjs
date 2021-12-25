import { IsInt, IsString } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  name: string;
}
