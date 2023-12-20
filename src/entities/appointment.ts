export interface AppointmentProps {
  customer: string
  startsAt: Date
  endsAt: Date
}
export class Appointment {
  private readonly props: AppointmentProps

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get customer () {
    return this.props.customer
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get startsAt () {
    return this.props.startsAt
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get endsAt () {
    return this.props.endsAt
  }

  constructor (props: AppointmentProps) {
    const { startsAt, endsAt } = props

    if (startsAt < new Date()) {
      throw new Error('Appointments must start in the future')
    }

    if (endsAt <= startsAt) {
      throw new Error('Invalid end date')
    }

    this.props = props
  }
}
