/* eslint-disable prettier/prettier */
// productDto.ts
import { IsOptional, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SortDto {
  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  order?: string;
}

export class GetProductsDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SortDto)
  sort?: SortDto;

  @IsOptional()
  @IsString()
  featured?: boolean;
}
