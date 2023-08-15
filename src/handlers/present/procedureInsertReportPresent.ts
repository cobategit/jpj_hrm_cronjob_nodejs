import { LoggersApp } from '@jpj-common/module'
import { PresentServices } from '../../services'
import dotenv from 'dotenv'
import path from 'path'
import { jumpDays } from '../../utils'
import { format, isWeekend } from 'date-fns'

export const procedureInsertIntoReport = async () => {
    dotenv.config({ path: path.join(__dirname, './../../../.env') })
    LoggersApp.configureLogger()
    const beforeOneDate = jumpDays("kurang", 1)
    const formatBeforeOneDate = `${format(beforeOneDate!, 'yyyy-MM-dd')}`
    let res: Record<string, any> = {}

    if (!isWeekend(new Date(`${formatBeforeOneDate}`))) {
        res = await PresentServices.procedureInsertIntoReport()
    }
    LoggersApp.info("return call procedure insert into report", res)
}

procedureInsertIntoReport()