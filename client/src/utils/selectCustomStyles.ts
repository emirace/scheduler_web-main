export const getCustomStyles = (isDisabled: boolean) => ({
  control: provided => ({
    ...provided,
    marginRight: '25px',
    cursor: 'pointer',
    border: 0,
    borderRadius: '5px',
    backgroundColor: '#F6F5F3',
    outline: 'none',
    padding: '0 10px 0 5px',
    boxShadow: '0px 0px 3px 0px rgba(155, 154, 151, 0.12)',
    opacity: isDisabled ? 0.5 : 1,
    '&:hover': {
      borderColor: 'none',
    },
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'Inter',
    color: '#3D3A34',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#F6F5F3' : 'white',
    color: '#3D3A34',
    '&:hover': {
      backgroundColor: '#F6F5F3',
      cursor: 'pointer',
    },
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Inter',
  }),
  menu: provided => ({
    ...provided,
    // customize the menu styles
    backgroundColor: '#F6F5F3',
    borderRadius: '5px',
    boxShadow: '0px 0px 3px 0px rgba(155, 154, 151, 0.12)',
    marginTop: '8px',
  }),
  input: provided => ({
    ...provided,
    color: 'transparent',
  }),
})
