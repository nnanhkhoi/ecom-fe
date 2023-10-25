import { useState } from 'react'

function getLocalStorageOrDefault(key, defaultValue) {
  const stored = localStorage.getItem(key)
  //   if (!stored) {
  //     return defaultValue
  //   }
  return JSON.parse(stored)
}

export function useSession(key, defaultValue) {
  const [value, setValue] = useState(
    getLocalStorageOrDefault(key, defaultValue)
  )

  //   useEffect(() => {
  //     localStorage.setItem(key, JSON.stringify(value))
  //   }, [key, value])

  return value
}
