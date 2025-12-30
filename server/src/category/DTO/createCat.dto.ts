import { IsNotEmpty, IsString, isString } from "class-validator";

export class createCatDto {
    @IsNotEmpty()
    @IsString()
    name:string
}