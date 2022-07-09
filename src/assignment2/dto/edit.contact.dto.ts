import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class IEditContact {

    @ApiProperty()
    @IsOptional()
    @IsString()
    logo: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    birthDate: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    phone: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    email: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    url: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    contactId: number
}
