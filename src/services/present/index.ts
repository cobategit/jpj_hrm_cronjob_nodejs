import { PresentData } from '../../data'

export class PresentServices {
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

  public static async existActivityPresent(data: any): Promise<any> {
    const resMangkir = await PresentData.findExistMangkirByDate(data)
    const resCuti = await PresentData.findExistCutiByDate(data)
    const resDinas = await PresentData.findExistDinasByDate(data)

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
}
