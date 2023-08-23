import { HolidayData } from "../../data";
import { ParamsEntity } from "../../interfaces";

export class HolidayServices {
    public static async dateHoliday(data: Pick<ParamsEntity, 'start_date' | 'end_date'>): Promise<any> {
        const res = await HolidayData.disableDateByHoliday(data)

        return res
    }
}