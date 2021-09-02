import { getUser } from '@iustitia/site/auth'

export function seeAuth() {
  const token = getUser()
  return !!token
}
