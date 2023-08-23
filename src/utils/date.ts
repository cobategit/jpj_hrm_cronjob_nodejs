export const jumpDays = (type: string, calculate: number, date: Date = new Date()) => {
    switch (type) {
        case "tambah":
            return date.setDate(date.getDate() + calculate)
        case "kurang":
            return date.setDate(date.getDate() - calculate)
    }
}

export const calculateTwoDateByDays = (date_one: Date = new Date(), date_two: Date = new Date()) => {
    let diff = date_one.getTime() - date_two.getTime()
    let totalDiffDay = Math.ceil(diff / (1000 * 3600 * 24));
    return totalDiffDay
}

export const calculateTwoMonth = (date_one: Date = new Date(), date_two: Date = new Date()) => {
    let months;
    months = (date_two.getFullYear() - date_one.getFullYear()) * 12;
    months -= date_one.getMonth();
    months += date_two.getMonth();
    return months <= 0 ? 0 : months;
}