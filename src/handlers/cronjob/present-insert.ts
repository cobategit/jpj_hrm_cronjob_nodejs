import cronJob from 'node-cron'
import shelljs from 'shelljs'
import path from 'path'
import { LoggersApp } from '@jpj-common/module'

export const cronProcedureInsertReport = cronJob.schedule(
    `0 1 * * *`,
    () => {
        console.log('schedule insert into report present runnning...')
        LoggersApp.info('schedule insert into report present runnning...', {})

        if (shelljs.exec(
            `node ${path.join(
                __dirname,
                './../../handlers/cronjob/present/procedureInsertReportPresent.js'
            )}`,
        ).code !== 0) {
            LoggersApp.error("Terjadi kesalahn cronjobs schedule insert into report present", {})
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Jakarta',
    }
)

cronProcedureInsertReport.start();
