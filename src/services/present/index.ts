import { PresentData } from '../../data'

export class PresentServices {

  public static async findUsers() {
    const users = await PresentData.selectUsers()

    return users
  }

  public static async procedureInsertIntoReport() {
    const resCheckIn = await PresentData.insertCheckInToReport()
    const resCheckOut = await PresentData.insertCheckOutToReport()

    return { resCheckIn, resCheckOut }
  }

  public static async updateExistPresent(
    nik: any,
    category: string,
    created_at: string,
    status: number
  ): Promise<any> {
    const res = await PresentData.updateStatusReportByNikDate(
      nik,
      category,
      created_at,
      status
    )

    return res
  }

  public static async existActivityPresent(date: string, nik?: string): Promise<any> {
    const resMangkir = await PresentData.findExistMangkirByDate(date, nik)
    const resCuti = await PresentData.findExistCutiByDate(date, nik)
    const resDinas = await PresentData.findExistDinasByDate(date, nik)

    return {
      mangkir: resMangkir,
      cuti: resCuti,
      dinas: resDinas,
    }
  }

  public static async reportByRangeDate(data: any) {
    const res = await PresentData.findReportPresentByRangeDate(data)

    return res
  }

  public static async updateUserCuti(data: any) {
    const resUser = await PresentData.selectUserCuti(data.id_user)

    if (resUser.length > 0) {
      await PresentData.updateCuti(data)
    } else {
      await PresentData.insertCuti(data)
    }
  }
}
