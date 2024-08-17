import uv from "../../public/icons/uv.png";
import uvWarn from "../../public/icons/uv-warn.png";

const getUvIcon = (uvIndex) => {
    let uvIcon;

    if (uvIndex < 7) {
        uvIcon = uv;
    } else {
        uvIcon = uvWarn;
    }
    return uvIcon;
}

export default getUvIcon;