export type User = {
  uuid: string
  email: string
  name: {
    firstName?: string
    lastName?: string
  }
  sex?: Sex
  status: Status
}

export enum Sex {
  male = 'male',
  female = 'female',
}

export enum Status {
  active = 'active',
  ban = 'ban',
  inactive = 'inactive',
}