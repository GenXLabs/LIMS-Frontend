const Popover = skin => {
  const boxShadow = theme => {
    if (skin === 'bordered') {
      return theme.shadows[0]
    } else if (theme.palette.mode === 'light') {
      return theme.shadows[6]
    } else return '0px 3px 14px 0px rgba(15, 20, 34, 0.38)'
  }

  return {
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          boxShadow: boxShadow(theme),
          ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
        })
      }
    }
  }
}

export default Popover
