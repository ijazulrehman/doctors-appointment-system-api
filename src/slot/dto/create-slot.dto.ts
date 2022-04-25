import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, Matches } from "class-validator";
import { WeekDay } from "../slot.enum";

export class CreateSlotDto {

    @ApiProperty({
        description: 'Day of Week',
        required: true,
        enum: WeekDay
    })
    @IsEnum(WeekDay)
    weekDay: WeekDay;

    @ApiProperty({
        description: `It should start from 0-23 or 00-23.
        It should be followed by a ‘:'(colon).
        It should be followed by two digits from 00 to 59.
        It should not end with ‘am’, ‘pm’ or ‘AM’, ‘PM’.`,
        example: '09:00'

    })
    @Matches(/([01]?[0-9]|2[0-3]):[0-5][0-9]/, {
        message: `It should start from 0-23 or 00-23.
        It should be followed by a ‘:'(colon).
        It should be followed by two digits from 00 to 59.
        It should not end with ‘am’, ‘pm’ or ‘AM’, ‘PM’.`
    })
    start: string;

    @ApiProperty({
        description: `It should start from 0-23 or 00-23.
        It should be followed by a ‘:'(colon).
        It should be followed by two digits from 00 to 59.
        It should not end with ‘am’, ‘pm’ or ‘AM’, ‘PM’.`,
        example: '12:00'
    })
    @Matches(/([01]?[0-9]|2[0-3]):[0-5][0-9]/, {
        message: `It should start from 0-23 or 00-23.
        It should be followed by a ‘:'(colon).
        It should be followed by two digits from 00 to 59.
        It should not end with ‘am’, ‘pm’ or ‘AM’, ‘PM’.`
    })
    end: string;

}
