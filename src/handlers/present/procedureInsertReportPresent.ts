import { LoggersApp } from '@jpj-common/module'
import { HolidayServices, PresentServices } from '../../services'
import dotenv from 'dotenv'
import path from 'path'
import { jumpDays } from '../../utils'
import { format } from 'date-fns'
import { ParamsEntity } from '../../interfaces'

export const procedureInsertIntoReport = async () => {
    let duration: number = 1
    dotenv.config({ path: path.join(__dirname, './../../../.env') })
    LoggersApp.configureLogger()
    let res: Record<string, any> = {}
    let date_now: Date = new Date()
    let thirdty_date = jumpDays("kurang", 30, date_now)
    let mapDate: Map<string, Pick<ParamsEntity, 'start_date' | 'end_date'>> = new Map<string, Pick<ParamsEntity, 'start_date' | 'end_date'>>()

    mapDate.set("data", { start_date: `${format(thirdty_date!, 'yyyy-MM-dd')}`, end_date: `${format(date_now, 'yyyy-MM-dd')}` })
    const blockDate = await HolidayServices.dateHoliday(mapDate.get("data")!)
    let convertBlockData: Set<string> = new Set(blockDate.map((val: any) => `${format(val.dates, 'yyyy-MM-dd')}`))

    for (let index = duration; index <= blockDate.length; index++) {
        const beforeOneDate = jumpDays("kurang", index)
        const formatBeforeOneDate = `${format(beforeOneDate!, 'yyyy-MM-dd')}`

        if (!convertBlockData.has(formatBeforeOneDate)) {
            duration = index
            break
        }
    }

    if (duration == 1) {
        res = await PresentServices.procedureInsertIntoReport()
    }

    LoggersApp.info("return call procedure insert into report", res)
}

procedureInsertIntoReport()