export const whereAnd = async (value?: string | null | undefined, key?: string): Promise<string> => {
    let whereAnd = ""

    if (value) {
        whereAnd = ` AND ${key} = "${value}" `
    }

    return Promise.resolve(whereAnd)
}