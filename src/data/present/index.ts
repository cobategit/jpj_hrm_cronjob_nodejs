import { AppError, LoggersApp } from '@jpj-common/module'
import { MysqlWrapData } from '..'
import { whereAnd } from '../../utils'

export class PresentData {
  private static db: MysqlWrapData = new MysqlWrapData()

  public static async selectUsers(): Promise<any> {
    try {
      const [rows, _] = await this.db.executeDql(
        `
        SELECT
        u.id, u.nik, u.name, de.start_periode, uc.day
      FROM
        users AS u
        INNER JOIN detail_employements AS de
          ON u.id = de.id_user
          AND de.status = 1
        LEFT JOIN user_cuti AS uc
          ON u.id = uc.id_user
          ORDER BY u.name
        `,
        []
      )

      return rows
    } catch (error) {
      throw new AppError(500, false, 'Failed select all users', '500')
    }
  }

  public static async insertCheckInToReport(): Promise<any> {
    try {
      const res = await this.db.executeDml(`call insertCheckInReport()`, [])

      return res
    } catch (error) {
      LoggersApp.error(
        'Failed call procedure insert into checkin to report',
        error
      )
      throw new AppError(500, false, 'error procedure insert in report', '500')
    }
  }

  public static async insertCheckOutToReport(): Promise<any> {
    try {
      const res = await this.db.executeDml(`call insertCheckOutReport()`, [])

      return res
    } catch (error) {
      LoggersApp.error(
        'Failed call procedure insert into checkin to report',
        error
      )
      throw new AppError(500, false, 'error procedure insert out report', '500')
    }
  }

  public static async findExistMangkirByDate(date: string, nik?: string): Promise<any> {
    let whereNik = await whereAnd(nik, "u.nik")

    try {
      const [rows, _] = await this.db.executeDql(
        `select
                u.nik,
                u.name,
                l.no_leaves
              from
                ${process.env.TB_USERS} as u
                LEFT JOIN ${process.env.TB_LEAVES} as l
                  on l.id_user_request = u.id
                  and l.start_leave_date = '${date}'
              where l.no_leaves is not null ${whereNik}`,
        []
      )

      return rows
    } catch (error) {
      LoggersApp.error('Failed query exist mangkir by date', error)
      throw new AppError(500, false, 'error find exist mangkir by date', '500')
    }
  }

  public static async findExistCutiByDate(date: string, nik?: string): Promise<any> {
    let whereNik = await whereAnd(nik, "u.nik")

    try {
      const [rows, _] = await this.db.executeDql(
        `SELECT  
        u.nik,
        u.name,
        l.no_leaves
      FROM
      ${process.env.TB_USERS} AS u
        LEFT JOIN ${process.env.TB_LEAVES} AS l
          ON l.id_user_request = u.id
          and l.status = 1
          AND l.start_leave_date <= '${date}'
          and l.end_leave_date >= '${date}'
      where l.no_leaves is not null ${whereNik}`,
        []
      )

      return rows
    } catch (error) {
      LoggersApp.error('Failed query exist cuti by date', error)
      throw new AppError(500, false, 'error find exist cuti by date', '500')
    }
  }

  public static async findExistDinasByDate(date: string, nik?: string): Promise<any> {
    let whereNik = await whereAnd(nik, "u.nik")

    try {
      const [rows, _] = await this.db.executeDql(
        `select
        u.id,
        u.nik,
        u.name
      from
        ${process.env.TB_USERS} as u
        LEFT JOIN jatim_inventory.${process.env.TB_GENERAL_VENDOR} AS gv
          ON u.nik = gv.nik
        LEFT JOIN jatim_inventory.${process.env.TB_PERDIN_SURAT} AS ps
          ON gv.general_vendor_id = ps.id_user
          AND ps.date_from <= '${date}'
          AND ps.date_to >= '${date}'
      WHERE ps.sa_no IS NOT NULL ${whereNik};`,
        []
      )

      return rows
    } catch (error) {
      LoggersApp.error('Failed query exist dinas by date', error)
      throw new AppError(500, false, 'error find exist dinas by date', '500')
    }
  }

  public static async updateStatusReportByNikDate(
    nik: any,
    category: string,
    created_at: any,
    status: number
  ): Promise<any> {
    try {
      const res = await this.db.executeDml(
        `update ${process.env.TABLE_REPOR_PRESENT_HO} set sts = ?, category = ? where nik IN(?) and DATE_FORMAT(created_at, '%Y-%m-%d') = ?`,
        [status, category, nik, created_at]
      )

      return res
    } catch (error) {
      LoggersApp.warn(`Failed update status report`, error)
      throw new AppError(500, false, 'error update status report by nik date', '500')
    }
  }

  public static async findReportPresentByRangeDate(data: any): Promise<any> {
    try {
      const [rows, _] = await this.db.executeDql(
        `
        SELECT
          id, nik, nama, DATE_FORMAT(clocking_time, '%m/%d/%Y %H:%m:%s') as clocking_time, category
        FROM
          report_present_ho
        WHERE DATE_FORMAT(created_at, '%Y-%m-%d') BETWEEN '${data['start_date']}'
          AND '${data['end_date']}'`,
        []
      )

      return rows
    } catch (error) {
      LoggersApp.error("Failed find report present by range date", error)
      throw new AppError(500, false, 'error find report present by range date', '500')
    }
  }

  public static async selectUserCuti(id: number): Promise<any> {
    try {
      const [rows, _] = await this.db.executeDql(
        `
        SELECT
        u.id, u.nik, u.name, de.start_periode, uc.day
      FROM
        users AS u
        INNER JOIN detail_employements AS de
          ON u.id = de.id_user
          AND de.status = 1
        RIGHT JOIN user_cuti AS uc
          ON u.id = uc.id_user
          WHERE u.id = ?
          ORDER BY u.name
        `,
        [id]
      )

      return rows
    } catch (error) {
      throw new AppError(500, false, 'Failed select all users', '500')
    }
  }

  public static async insertCuti(data: any): Promise<any> {
    try {
      const res = await this.db.executeDml(
        `
        insert into user_cuti set ?
        `,
        [data]
      )

      return res
    } catch (error) {
      throw new AppError(500, false, 'failed update cuti', '500')
    }
  }

  public static async updateCuti(data: any): Promise<any> {
    try {
      const res = await this.db.executeDml(
        `
        update user_cuti set day = ?, year = ? where id_user = ?
        `,
        [data.day, data.year, data.id_user]
      )

      return res
    } catch (error) {
      throw new AppError(500, false, 'failed update cuti', '500')
    }
  }
}
