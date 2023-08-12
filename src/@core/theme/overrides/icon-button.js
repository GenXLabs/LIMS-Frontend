// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const IconButton = {
  MuiIconButton: {
    variants: [
      {
        props: { color: 'primary' },
        style: ({ theme }) => ({
          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
          }
        })
      },
      {
        props: { color: 'secondary' },
        style: ({ theme }) => ({
          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.08)
          }
        })
      },
      {
        props: { color: 'success' },
        style: ({ theme }) => ({
          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.success.main, 0.08)
          }
        })
      },
      {
        props: { color: 'error' },
        style: ({ theme }) => ({
          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.error.main, 0.08)
          }
        })
      },
      {
        props: { color: 'warning' },
        style: ({ theme }) => ({
          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.warning.main, 0.08)
          }
        })
      },
      {
        props: { color: 'info' },
        style: ({ theme }) => ({
          '&:hover': {
            backgroundColor: hexToRGBA(theme.palette.info.main, 0.08)
          }
        })
      }
    ],
    styleOverrides: {
      root: ({ theme }) => ({
        '&:hover': {
          backgroundColor: `rgba(${theme.palette.customColors.main}, 0.08)`
        }
      })
    }
  }
}

export default IconButton
