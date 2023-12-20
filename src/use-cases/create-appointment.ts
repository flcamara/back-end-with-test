import { Appointment } from '../entities/appointment'
import { type AppointmentsRepository } from '../repositories/appointments-repository'

interface CreateAppointmentRequest {
  customer: string
  startsAt: Date
  endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  constructor (
    private readonly appointmentsRepositoty: AppointmentsRepository
  ) {}

  async execute ({ customer, startsAt, endsAt }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overLappingAppointment = await this.appointmentsRepositoty.findOverLappinAppointment(startsAt, endsAt)
    if (overLappingAppointment != null) {
      throw new Error('Another appointment overlaps this appointment dates')
    }
    const appointment = new Appointment({ customer, startsAt, endsAt })
    await this.appointmentsRepositoty.create(appointment)
    return appointment
  }
}
