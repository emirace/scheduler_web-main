const employeeColorThemes = [
  { light: '#f4eada', dark: '#d9b883', text: '#7a6b52' },
  { light: '#e8e8fd', dark: '#b2b2f7', text: '#52577a' },
  { light: '#f0ede8', dark: '#a1998b', text: '#746e63' },
  { light: '#e1f3e9', dark: '#a3e1b4', text: '#247543' },
]

export const getColorThemeByEmployeeProperty = property => {
  // Use the hashing function to generate a consistent index
  const index = Math.abs(getHashCode(property)) % employeeColorThemes.length
  return employeeColorThemes[index]
}

const getHashCode = str => {
  let hash = 0
  if (str.length === 0) {
    return hash
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}
