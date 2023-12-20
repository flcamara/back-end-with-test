import { areIntervalsOverlapping } from 'date-fns'
import { type Appointment } from '../../entities/appointment'
import { type AppointmentsRepository } from '../appointments-repository'

export class inMemoryAppointmentsRepository implements AppointmentsRepository {
  public items: Appointment[] = []

  async create (appointament: Appointment): Promise<void> {
    this.items.push(appointament)
  }

  async findOverLappinAppointment (startsAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overLappingAppointment = this.items.find(appointment => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: appointment.startsAt, end: appointment.endsAt },
        { inclusive: true }
      )
    })

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!overLappingAppointment) {
      return null
    }

    return overLappingAppointment
  }
}
