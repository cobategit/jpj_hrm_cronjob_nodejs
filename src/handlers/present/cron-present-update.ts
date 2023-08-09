import cronJob from 'node-cron'
import shelljs from 'shelljs'
import path from 'path'
import { LoggersApp } from '@jpj-common/module'

const cronUpdateStatusReport = cronJob.schedule(
    `30 1 * * *`,
    () => {
        LoggersApp.configureLogger()
        console.log('schedule update report present runnning...')
        LoggersApp.info('schedule update status report present runnning...', {})

        if (shelljs.exec(
            `node ${path.join(
                __dirname,
                'updateExistReportPresent.js'
            )}`,
        ).code !== 0) {
            console.log('Terjadi kesalahn cronjobs schedule update report present...')
            LoggersApp.error("Terjadi kesalahn cronjobs schedule update report present", {})
        }
    },
    {
        scheduled: true,
        timezone: 'Asia/Jakarta',
    }
)

cronUpdateStatusReport.start()