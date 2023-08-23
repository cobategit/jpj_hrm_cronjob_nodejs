import { format, getMonth } from "date-fns"
import { PresentServices } from "../../services"
import { calculateTwoDateByDays, calculateTwoMonth } from "../../utils"

async function updateCutiAfterOneYearsContract() {
    const users = await PresentServices.findUsers()

    await Promise.allSettled(
        users.map(async (val: { id: number, nik: string, name: string, start_periode: Date, day: number }) => {
            let allowedCuti = calculateTwoDateByDays(new Date(`${format(new Date(), 'yyyy-MM-dd')}`), new Date(`${format(val.start_periode, 'yyyy-MM-dd')}`))
            if (allowedCuti == 365) {
                let cutOffDate = ''
                let month = getMonth(new Date(`${format(val.start_periode, 'yyyy-MM-dd')}`))

                if ((month + 1) > 10) {
                    cutOffDate = format(new Date(`${new Date().getFullYear() - 1}-${month + 1}-15`), 'yyyy-MM-dd')
                } else {
                    cutOffDate = format(new Date(`${new Date().getFullYear() - 1}-0${month + 1}-15`), 'yyyy-MM-dd')
                }

                let hakCuti = calculateTwoMonth(new Date(), new Date(`${new Date().getFullYear()}-12-31`))
                if (format(val.start_periode, 'yyyy-MM-dd') < cutOffDate) {
                    hakCuti = hakCuti + 1
                }

                await PresentServices.updateUserCuti({ id_user: val.id, id_leave_types: 1, day: hakCuti, year: `${new Date().getFullYear()}` })
            }
        })
    )
}

updateCutiAfterOneYearsContract()