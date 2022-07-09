import { ApiProperty } from "@nestjs/swagger";

export class IDetailContact {
    @ApiProperty()
    logo: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    birthDate: string;

    @ApiProperty()
    phone: string[];

    @ApiProperty()
    email: string[];

    @ApiProperty()
    url: string[];
}
