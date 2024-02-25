import { useState, useEffect } from 'react'

const onSearch = async (query) => {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const suggestions = await response.json()
    return suggestions
  } catch (error) {
    console.error('Error fetching search suggestions:', error)
    return [] // Return an empty array in case of error
  }
}

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (query.length > 2) {
      // Trigger search when there are at least 3 characters
      onSearch(query).then(setSuggestions)
    } else {
      setSuggestions([])
    }
  }, [query, onSearch])

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
