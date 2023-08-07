export const jumpDays = (type: string, calculate: number, date: Date = new Date()) => {
    switch (type) {
        case "tambah":
            return date.setDate(date.getDate() + calculate)
        case "kurang":
            return date.setDate(date.getDate() - calculate)
    }
}