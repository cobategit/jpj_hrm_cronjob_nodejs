import { LoggersApp } from '@jpj-common/module'
import { PresentServices } from '../../services'
import dotenv from 'dotenv'
import path from 'path'

export const procedureInsertIntoReport = async () => {
    dotenv.config({ path: path.join(__dirname, './../../../.env') })
    LoggersApp.configureLogger()
    const res = await PresentServices.procedureInsertIntoReport()
    LoggersApp.info("return call procedure insert into report", res)
}

procedureInsertIntoReport()