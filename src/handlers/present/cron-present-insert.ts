import cronJob from 'node-cron'
import shelljs from 'shelljs'
import path from 'path'
import { LoggersApp } from '@jpj-common/module'

const cronProcedureInsertReport = cronJob.schedule(
    `0 1 * * *`,
    () => {
        LoggersApp.configureLogger()
        console.log('schedule insert into report present runnning...')
        LoggersApp.info('schedule insert into report present runnning...', {})

        if (shelljs.exec(
            `node ${path.join(
                __dirname,
                'procedureInsertReportPresent.js'
            )}`,
        ).code !== 0) {
            console.log('Terjadi kesalahn cronjobs schedule insert into report present...')
            LoggersApp.error("Terjadi kesalahn cronjobs schedule insert into report present", {})
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Jakarta',
    }
)

export {
    cronProcedureInsertReport
}
