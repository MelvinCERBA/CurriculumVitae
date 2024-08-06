export const useRouteParam = (key:string) : string => {
  return useRoute().params[key].toString()
}
