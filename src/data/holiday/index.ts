import { AppError, LoggersApp } from "@jpj-common/module"
import { MysqlWrapData } from "../mysql"
import { ParamsEntity } from "../../interfaces"

export class HolidayData {
    private static db: MysqlWrapData = new MysqlWrapData()

    public static async disableDateByHoliday(data: Pick<ParamsEntity, 'start_date' | 'end_date'>): Promise<any> {
        try {
            const [rows, _] = await this.db.executeDql(
                `
                SELECT doy.dates
                FROM
                dateofyear AS doy
                LEFT JOIN
                holidays AS hol
                ON doy.dates BETWEEN hol.start_date AND hol.end_date OR (DAYOFWEEK(doy.dates) = 7 OR DAYOFWEEK(doy.dates) = 1)
                WHERE doy.dates BETWEEN '${data.start_date}' AND '${data.end_date}' AND hol.desc IS NOT NULL
                GROUP BY doy.dates
                ORDER BY doy.dates
                `,
                []
            )

            return rows
        } catch (error) {
            LoggersApp.error(
                'Failed call procedure insert into checkin to report',
                error
            )
            throw new AppError(500, false, 'failed select disable date by holiday', '500')
        }
    }
}