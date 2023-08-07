import { format } from "date-fns"
import { PresentServices } from "../../services"
import { LoggersApp } from "@jpj-common/module"
import dotenv from 'dotenv'
import path from 'path'
import { jumpDays } from "../../utils"

export const updateExistReportPresent = async () => {
    dotenv.config({ path: path.join(__dirname, './../../../.env') })
    LoggersApp.configureLogger()
    // const date = new Date("2023-08-04") // disesuaikan dengan hari pengambilan employee sedang cuti atau dinas atau mangkir
    const beforeOneDate = jumpDays("kurang", 1)
    const formatBeforeOneDate = `${format(beforeOneDate!, 'yyyy-MM-dd')}`
    const map: Map<string, string> = new Map<string, string>()
    let arrNik: string[] = []
    let category: string = ""
    let status: number = 0

    map.set("data", `${format(beforeOneDate!, 'yyyy-MM-dd')}`)
    const resExistPresent = await PresentServices.existActivityPresent(map.get("data"))

    if (resExistPresent['cuti'].length > 0) {
        category = "CUTI"
        status = 3
        await Promise.all(
            resExistPresent['cuti'].map((el: any) => {
                arrNik.push(el['nik'])
            })
        )
    }

    if (resExistPresent['mangkir'].length > 0) {
        category = "MANGKIR"
        status = 4
        await Promise.all(
            resExistPresent['mangkir'].map((el: any) => {
                arrNik.push(el['nik'])
            })
        )
    }

    if (resExistPresent['dinas'].length > 0) {
        category = "DINAS"
        status = 2
        await Promise.all(
            resExistPresent['dinas'].map((el: any) => {
                arrNik.push(el['nik'])
            })
        )
    }

    if (arrNik.length > 0) {
        const resUpdate = await PresentServices.updateExistPresent(arrNik, category, formatBeforeOneDate, status)
    }

    // console.log(`update ${resUpdate[0]['changedRows']}`)
    LoggersApp.info("execute update exist report present", {})
}

updateExistReportPresent()