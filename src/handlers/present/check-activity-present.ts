import { ApiResponse, AppError, LoggersApp } from '@jpj-common/module'
import { PresentServices } from '../../services'

export const checkActivityPresent = async (request: any, reply: any): Promise<void> => {
    try {
        const { date, nik } = request.query

        const data = await PresentServices.existActivityPresent(date, nik)

        return ApiResponse.ok(request, reply, { success: true, data })
    } catch (error) {
        LoggersApp.error("Failed export excel handler", error)
        throw new AppError(500, false, `${error}`, '500')
    }
}