import { Body, Controller, Get, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Response } from 'express';
import { CalculatorTaxService } from './calculator-tax.service';
import { InputNet } from './dto/input-net.dto';
import { IOutPutTax } from './dto/output.pit.dto';

@Controller('calculator-tax')
@ApiTags('calculator-tax')
@ApiExtraModels(IOutPutTax)
@ApiBadRequestResponse({ description: 'Bad Request' })
export class CalculatorTaxController {
    constructor(
        private readonly calculatorService: CalculatorTaxService
    ) { }

    @ApiOkResponse({
        schema: {
            oneOf: [{ $ref: getSchemaPath(IOutPutTax) }],
        },
    })
    @Get('')
    calculator(@Res() res: Response, @Body('') arg: InputNet) {
        const result: number = this.calculatorService.calculateTaxIncome(arg.netIncome)
        return res.json({ personalIncomeTax: result })
    }
}
