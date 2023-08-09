import cronJob from 'node-cron'
import shelljs from 'shelljs'
import path from 'path'
import { LoggersApp } from '@jpj-common/module'

export const cronProcedureInsertReport = cronJob.schedule(
    `0 1 * * *`,
    () => {
        console.log('schedule insert into report present runnning...')
        LoggersApp.info('schedule insert into report present runnning...', {})

        let child = shelljs.exec(
            `node ${path.join(
                __dirname,
                './../present/procedureInsertReportPresent.js'
            )}`,
            {
                async: true,
            }
        )

        setTimeout(() => {
            return shelljs.exit(1)
        }, 1200000)
    },
    {
        scheduled: true,
        timezone: 'Asia/Jakarta',
    }
)

export const cronUpdateStatusReport = cronJob.schedule(
    `30 1 * * *`,
    () => {
        console.log('schedule update report present runnning...')
        LoggersApp.info('schedule update status report present runnning...', {})

        let child = shelljs.exec(
            `node ${path.join(
                __dirname,
                './../present/updateExistReportPresent.js'
            )}`,
            {
                async: true,
            }
        )

        setTimeout(() => {
            return shelljs.exit(1)
        }, 1200000)
    },
    {
        scheduled: true,
        timezone: 'Asia/Jakarta',
    }
)

cronProcedureInsertReport.start();
cronUpdateStatusReport.start();
