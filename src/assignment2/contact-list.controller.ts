import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { S3 } from 'aws-sdk';
import { Update } from 'aws-sdk/clients/dynamodb';
import { Response } from 'express';
import { ContactListService } from './contact-list.service';
import { ICreateContact } from './dto/create.contact.dto';
import { ICreateGroup } from './dto/create.group.dto';
import { IEditContact } from './dto/edit.contact.dto';
import { IEditGroup } from './dto/edit.group.dto';
import { IGetallGroup } from './dto/get.all.group.dto';
import { IDetailContact } from './dto/get.detail.contact.dto';
import { Contact } from './entity/contact.entity';
import { Group } from './entity/group.entity';

@Controller('contact-list')
@ApiExtraModels(IDetailContact, Group, Contact, IGetallGroup)
@ApiBadRequestResponse({ description: 'Bad Request' })
export class ContactListController {
    constructor(private readonly contactListService: ContactListService) { }

    @ApiTags('group')
    @ApiCreatedResponse({
        schema: {
            oneOf: [{ $ref: getSchemaPath(Group) }],
        },
    })
    @Post('/group/create')
    async createNewGroup(@Res() res: Response, @Body() arg: ICreateGroup) {
        const result: Group = await this.contactListService.createGroup(arg);
        return res.status(HttpStatus.CREATED).json(result);
    }

    @ApiTags('group')
    @ApiOkResponse({
        schema: {
            oneOf: [{ $ref: getSchemaPath(IGetallGroup) }],
        },
    })
    @Get('/group')
    async findGroup(@Res() res: Response) {
        const result: Group[] = await this.contactListService.getAllGroup();
        return res.status(HttpStatus.OK).json(result);
    }

    @ApiTags('group')
    @ApiNoContentResponse({ description: 'No Content' })
    @Put('/group/delete/:id')
    async deleteAnGroup(@Res() res: Response, @Param('id') id: string) {
        await this.contactListService.deleteGroup(id);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @ApiTags('group')
    @ApiNoContentResponse({ description: 'No Content' })
    @Put('/group/edit')
    async editGroup(@Res() res: Response, @Body('') arg: IEditGroup) {
        await this.contactListService.updateGroup(arg);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @ApiTags('group')
    @ApiOkResponse({
        schema: {
            oneOf: [{ $ref: getSchemaPath(Contact) }],
        },
    })
    @Get('group/:id/contact/')
    async findContact(@Res() res: Response, @Param('id') id: string) {
        const result: Contact[] =
            await this.contactListService.getConatactByGroupId(id);
        return res.status(HttpStatus.OK).json(result);
    }

    @ApiTags('contact')
    @ApiOkResponse({
        schema: {
            oneOf: [{ $ref: getSchemaPath(Contact) }],
        },
    })
    @Post('/contact/create')
    async createNewContact(@Res() res: Response, @Body() arg: ICreateContact) {
        const result: Contact = await this.contactListService.createContact(arg);
        return res.status(HttpStatus.CREATED).json(result);
    }

    @ApiTags('contact')
    @ApiOkResponse({
        schema: {
            oneOf: [{ $ref: getSchemaPath(IDetailContact) }],
        },
    })
    @Get('/contact/:id')
    async getOneContact(@Res() res: Response, @Param('id') id: string) {
        const result: IDetailContact = await this.contactListService.getContactById(
            id,
        );
        return res.status(HttpStatus.CREATED).json(result);
    }

    @ApiTags('contact')
    @ApiNoContentResponse({ description: 'No Content' })
    @Put('/contact/edit')
    async editContact(@Res() res: Response, @Body('') arg: IEditContact) {
        await this.contactListService.updateContact(arg);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @ApiTags('contact')
    @ApiNoContentResponse({ description: 'No Content' })
    @Put('/contact/delete/:id')
    async deleteAnContact(@Res() res: Response, @Param('id') id: string) {
        await this.contactListService.deleteContact(id);
        return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    @ApiTags('upload-get image')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(
        @UploadedFile() image: Express.Multer.File,
        @Res() res: Response,
    ) {
        const result: string = await this.contactListService.uploadImage(image);
        return res.status(HttpStatus.OK).json({ url: result });
    }

    @ApiTags('upload-get image')
    @ApiOkResponse()
    @Get('/images/:name')
    async getImageFile(@Res() res: Response, @Param('name') name: string) {
        const result: S3.Body = await this.contactListService.getFile(name);
        return res.contentType('image/jpeg').send(result);
    }
}
