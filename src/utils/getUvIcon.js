import uv from '../../public/icons/uv.png'
import uvWarn from '../../public/icons/uv-warn.png'

export const getUvIcon = ({ uvIndex }) => (uvIndex < 7 ? uv : uvWarn)
