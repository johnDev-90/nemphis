import { IsBoolean, isDecimal, IsInt, IsNotEmpty, IsNumber, isString, IsString } from "class-validator";


export class ProductsDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description:string

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces:2})
    price:number

    @IsNotEmpty()
    @IsNumber()
    stock:number
    
    @IsBoolean()
    @IsNotEmpty()
    isActive:boolean

    @IsInt()
    @IsNotEmpty()
    categoryId: number

}