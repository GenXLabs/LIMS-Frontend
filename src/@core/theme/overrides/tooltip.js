// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const Tooltip = () => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          padding: theme.spacing(1, 3),
          fontSize: theme.typography.body1.fontSize,
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette.customColors.main}, 0.9)`
              : hexToRGBA(theme.palette.customColors.trackBg, 0.9)
        }),
        arrow: ({ theme }) => ({
          color:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette.customColors.main}, 0.9)`
              : hexToRGBA(theme.palette.customColors.trackBg, 0.9)
        })
      }
    }
  }
}

export default Tooltip
