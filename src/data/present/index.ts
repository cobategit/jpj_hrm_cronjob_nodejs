import { LoggersApp } from '@jpj-common/module'
import { MysqlWrapData } from '..'

export class PresentData {
  private static db: MysqlWrapData = new MysqlWrapData()

  public static async insertCheckInToReport(): Promise<any> {
    try {
      const res = await this.db.executeDml(`call insertCheckInReport()`, [])

      return res
    } catch (error) {
      LoggersApp.error(
        'Failed call procedure insert into checkin to report',
        error
      )
      throw false
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
      throw false
    }
  }

  public static async findExistMangkirByDate(date: string): Promise<any> {
    try {
      const [rows, fields] = await this.db.executeDql(
        `select
                u.nik,
                u.name,
                l.no_leaves
              from
                ${process.env.TB_USERS} as u
                LEFT JOIN ${process.env.TB_LEAVES} as l
                  on l.id_user_request = u.id
                  and l.start_leave_date = '${date}'
              where l.no_leaves is not null`,
        []
      )

      return rows
    } catch (error) {
      LoggersApp.error('Failed query exist mangkir by date', error)
      throw false
    }
  }

  public static async findExistCutiByDate(date: string): Promise<any> {
    try {
      const [rows, fields] = await this.db.executeDql(
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
      where l.no_leaves is not null`,
        []
      )

      return rows
    } catch (error) {
      LoggersApp.error('Failed query exist cuti by date', error)
      throw false
    }
  }

  public static async findExistDinasByDate(date: string): Promise<any> {
    try {
      const [rows, fields] = await this.db.executeDql(
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
      WHERE ps.sa_no IS NOT NULL;`,
        []
      )

      return rows
    } catch (error) {
      LoggersApp.error('Failed query exist dinas by date', error)
      throw false
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
      throw false
    }
  }

  public static async findReportPresentByRangeDate(data: any): Promise<any> {
    try {
      const [rows, fields] = await this.db.executeDql(
        `
        SELECT
          nik, nama, DATE_FORMAT(clocking_time, '%Y-%m-%d %H:%m:%s') as clocking_time, category
        FROM
          report_present_ho
        WHERE DATE_FORMAT(created_at, '%Y-%m-%d') BETWEEN '${data['start_date']}'
          AND '${data['end_date']}'`,
        []
      )

      return rows
    } catch (error) {
      LoggersApp.error("Failed find report present by range date", error)
      throw false
    }
  }
}
