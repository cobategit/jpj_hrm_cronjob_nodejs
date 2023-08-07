import { AppError, LoggersApp } from '@jpj-common/module'
import { connMysql } from '../../configs'

export class MysqlWrapData {
  public async executeDml(query: string, options: any[]) {
    let conn = await connMysql()

    try {
      await conn.query('START TRANSACTION')
      const res = await conn.query(`${query}`, options)
      await conn.query('COMMIT')
      await conn.end()

      return res
    } catch (error) {
      await conn.query('ROLLBACK')
      LoggersApp.error('Error mysql query dml', error)
      throw new AppError(500, false, 'Error mysql query dml', '500')
    }
  }

  public async executeDql(query: string, options: any[]) {
    let conn = await connMysql()

    try {
      const res = await conn.query(`${query}`, options)
      await conn.end()

      return res
    } catch (error) {
      LoggersApp.error('Error mysql query dql', error)
      throw new AppError(500, false, 'Error mysql query dql', '500')
    }
  }
}
