import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ICreateGroup {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string
}