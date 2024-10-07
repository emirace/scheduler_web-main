export const DropdownStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    border: state.isFocused ? '0.5px solid #DFDFDD' : '0.5px solid #DFDFDD',
    boxShadow: state.isFocused ? 'none' : 'none',
    '&:hover': {
      border: '0.5px solid #DFDFDD',
    },
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 400,
    color: '#3D3A34',
    cursor: 'pointer',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#F5F5F5' : 'white',
    padding: 10,
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 400,
    color: '#3D3A34',
    cursor: 'pointer',
  }),
}
