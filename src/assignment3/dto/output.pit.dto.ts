import { ApiProperty } from "@nestjs/swagger";

export class IOutPutTax {
    @ApiProperty()
    personalIncomeTax: number
}