// move fonts files to the font folder

import localfont from "next/font/local"


export const publicSans = localfont({
    src: [
        {
            path: "",
            weight: "400",
            style: "normal"
        }
    ]
})