import { expect, test } from 'vitest'
import { Appointment } from './appointment'
import { getFutureDate } from '../tests/utils/get-future-date'

test('create an appointament', () => {
  const startsAt = getFutureDate('2023-11-18')
  const endsAt = getFutureDate('2022-11-19')

  const appointament = new Appointment({
    customer: 'Jonh Doe',
    startsAt,
    endsAt
  })

  expect(appointament).toBeInstanceOf(Appointment)
  expect(appointament.customer).toEqual('Jonh Doe')
})

test('cannot create an appointament with end date before start date', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() + 2)
  endsAt.setDate(endsAt.getDate() + 1)

  expect(() => {
    return new Appointment({
      customer: 'Jonh Doe',
      startsAt,
      endsAt
    })
  }).toThrow()
})
