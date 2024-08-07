export function useApi<T>(endpoint: string, options = {}): Promise<T> {
  const base_url = useState('api_base_url', () => "http://localhost:3000")

  const token = useState('jwt_token', () => '')
  const loggedUserId = useState<number | null>('loggedUserId', () => null)

  const headers = {
    ...(options as any & { headers?: any }).headers,
    Authorization: token.value ? `Bearer ${token.value}` : ''
  }
  console.log("Headers: ", headers)

  return $fetch<T>(`${base_url.value}${endpoint}`, { ...options, headers })
}