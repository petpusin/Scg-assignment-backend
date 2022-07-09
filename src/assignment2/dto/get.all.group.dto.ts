import { ApiProperty } from "@nestjs/swagger"

export class IGetallGroup {
    @ApiProperty()
    id: number
    
    @ApiProperty()
    name: string

    @ApiProperty()
    totalcontact: string
}