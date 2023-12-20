import { describe, expect, it } from 'vitest'
import { CreateAppointment } from './create-appointment'
import { getFutureDate } from '../tests/utils/get-future-date'
import { inMemoryAppointmentsRepository } from '../repositories/inmemory/in-memory-appointments-repository'

describe('Create Appointment', () => {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  it('should not be able to create an appointment with overlapping dates', async () => {
    // eslint-disable-next-line new-cap
    const appointmentsRepositoty = new inMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepositoty)
    const startsAt = getFutureDate('2023-11-10')
    const endsAt = getFutureDate('2022-11-15')

    await createAppointment.execute({
      customer: 'Jonh Doe',
      startsAt,
      endsAt
    })

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-11-11'),
      endsAt: getFutureDate('2023-11-14')
    })).rejects.toBeInstanceOf(Error)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-11-09'),
      endsAt: getFutureDate('2023-11-12')
    })).rejects.toBeInstanceOf(Error)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-11-09'),
      endsAt: getFutureDate('2023-11-17')
    })).rejects.toBeInstanceOf(Error)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-11-11'),
      endsAt: getFutureDate('2023-11-12')
    })).rejects.toBeInstanceOf(Error)
  })
})
