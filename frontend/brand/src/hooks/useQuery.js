import {useMemo} from 'react'

import {useLocation} from 'react-router-dom'

export const UseQuerySearch = () => {
   const {search} = useLocation()
 
   return useMemo(() => new URLSearchParams(search)[search])
}