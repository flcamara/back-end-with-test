import { parseISO, setYear } from 'date-fns'

/*
* Recebe '2023-12-20' e retorna '2024-12-20'
*/
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getFutureDate (date: string) {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}
