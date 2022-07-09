import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ICreateContact {

    @ApiProperty()
    @IsOptional()
    @IsString()
    logo: string;

    @ApiProperty()
    @IsNotEmpty()
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
    @IsNotEmpty()
    @IsArray()
    phone: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    email: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    url: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    groupId: number;
}
