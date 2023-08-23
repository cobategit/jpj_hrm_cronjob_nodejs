import { ApiResponse, AppError, LoggersApp } from '@jpj-common/module'
import { PresentServices } from '../../services'
import XLSX from 'xlsx'

export const exportReportPresent = async (request: any, reply: any): Promise<void> => {
    try {
        const map: Map<string, any> = new Map<string, any>()

        map.set("data", {
            ...request.query
        })

        const data = await PresentServices.reportByRangeDate(map.get("data"))

        const headings = [
            ["User ID", "Employee ID", "Name", "Clocking Time", "Category"]
        ]

        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(data, {
            skipHeader: true
        })

        XLSX.utils.sheet_add_aoa(ws, headings)
        XLSX.utils.book_append_sheet(wb, ws, 'Report Present')

        XLSX.write(wb, { bookType: 'xls', type: 'buffer' })
        const filePath = `${process.env.SAVE_DOCS}/report-present-${request.query.start_date}sd${request.query.end_date}.xls`
        XLSX.writeFile(wb, filePath)
        reply.download(filePath)

        return ApiResponse.ok(request, reply, { success: true, message: "Success export excel" })
    } catch (error) {
        LoggersApp.error("Failed export excel handler", error)
        throw new AppError(500, false, `${error}`, '500')
    }
}