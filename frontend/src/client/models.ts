export type Body_login_login_access_token = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type CanvasCreate = {
  problem_name: string
  problem_url?: string | null
  ideas?: string | null
  constraints?: string | null
  test_cases?: string | null
  code?: string | null
}

export type CanvasPublic = {
  problem_name: string
  problem_url?: string | null
  ideas?: string | null
  constraints?: string | null
  test_cases?: string | null
  code?: string | null
  id: string
  owner_id: string
}

export type CanvasUpdate = {
  problem_name?: string | null
  problem_url?: string | null
  ideas?: string | null
  constraints?: string | null
  test_cases?: string | null
  code?: string | null
}

export type CanvasesPublic = {
  data: Array<CanvasPublic>
  count: number
}

export type HTTPValidationError = {
  detail?: Array<ValidationError>
}

export type Message = {
  message: string
}

export type NewPassword = {
  token: string
  new_password: string
}

export type Token = {
  access_token: string
  token_type?: string
}

export type UpdatePassword = {
  current_password: string
  new_password: string
}

export type UserCreate = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password: string
}

export type UserPublic = {
  email: string
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  id: string
}

export type UserRegister = {
  email: string
  password: string
  full_name?: string | null
}

export type UserUpdate = {
  email?: string | null
  is_active?: boolean
  is_superuser?: boolean
  full_name?: string | null
  password?: string | null
}

export type UserUpdateMe = {
  full_name?: string | null
  email?: string | null
}

export type UsersPublic = {
  data: Array<UserPublic>
  count: number
}

export type ValidationError = {
  loc: Array<string | number>
  msg: string
  type: string
}
