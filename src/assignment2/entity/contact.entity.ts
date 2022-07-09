import { ApiProperty } from "@nestjs/swagger";
import { group } from "console";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";

@Entity('contacts')
export class Contact {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    contactId: number

    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, default: "" })
    logo: string

    @ApiProperty()
    @Column({ type: 'varchar' })
    firstName: string

    @ApiProperty()
    @Column({ type: 'varchar', nullable: true, default: "" })
    lastName: string

    @ApiProperty()
    @Column({ type: 'timestamptz' })
    birthDate: Date

    @ApiProperty()
    @Column({ type: 'varchar', array: true, default: [] })
    phone: string[]

    @ApiProperty()
    @Column({ type: 'varchar', array: true, default: [] })
    email: string[]

    @ApiProperty()
    @Column({ type: 'varchar', array: true, default: [] })
    url: string[]

    @ApiProperty()
    @DeleteDateColumn()
    deletedAt: Date;

    @ApiProperty()
    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date

    @ApiProperty()
    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    lastChangedDateTime: Date

    @ManyToOne(() => Group, (group) => group.contact)
    group: Group

}