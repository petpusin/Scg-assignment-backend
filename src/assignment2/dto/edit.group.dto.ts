import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class IEditGroup {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    groupId: number
}