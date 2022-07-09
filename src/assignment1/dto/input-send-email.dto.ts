import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"

export class InputEmail {
    @ApiProperty()
    @IsNotEmpty()
    to: string

    @ApiProperty()
    @IsNotEmpty()
    from: string

    @ApiProperty()
    @IsOptional()
    message?: string

    @ApiProperty()
    @IsOptional()
    template_id?: string
}