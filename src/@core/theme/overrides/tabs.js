const Tabs = () => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 38,
          '&:not(.MuiTabs-vertical)': {
            borderBottom: `1px solid ${theme.palette.divider}`
          }
        }),
        vertical: ({ theme }) => ({
          minWidth: 130,
          marginRight: theme.spacing(4),
          borderRight: `1px solid ${theme.palette.divider}`,
          '& .MuiTab-root': {
            minWidth: 130
          }
        })
      }
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 38,
          textTransform: 'none',
          padding: theme.spacing(1.75, 5)
        }),
        textColorSecondary: ({ theme }) => ({
          '&.Mui-selected': {
            color: theme.palette.text.secondary
          }
        })
      }
    },
    MuiTabPanel: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(6)
        })
      }
    }
  }
}

export default Tabs
