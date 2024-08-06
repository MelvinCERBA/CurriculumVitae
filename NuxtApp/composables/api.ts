export const useFetchApi = (endpoint: string, options = {}) => {
  return $fetch(`${process.env.API_BASE_URL}${endpoint}`, options)
}