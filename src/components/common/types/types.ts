export type FieldsErrors = {
  error: string
}

export type Response<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldsErrors[]
}
