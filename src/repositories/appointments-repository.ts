import { type Appointment } from '../entities/appointment'

export interface AppointmentsRepository {
  create: (appointament: Appointment) => Promise<void>
  findOverLappinAppointment: (startsAt: Date, endsAt: Date) => Promise<Appointment | null>
}
