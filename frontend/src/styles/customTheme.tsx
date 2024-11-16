import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { lighten, darken } from "polished"

function lightenColor(mainColor, value) {
    return lighten(value, mainColor)
}
function darkenColor(mainColor, value) {
    return darken(value, mainColor)
}

const customTheme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            ".bgPage": {
                bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
            },
            ".codeBackground": {
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "pageBackground.light",
            },
        }),
    },
    components: {
        Button: {
            variants: {
                HeaderButton: (props: StyleFunctionProps) => ({
                    bg:
                        props.colorMode === "dark"
                            ? lightenColor(props.theme.colors.pageBackground.dark, 0.1)
                            : darkenColor(props.theme.colors.pageBackground.light, 0.05),
                    _hover: {
                        bg:
                            props.colorMode === "dark"
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.2)
                                : darkenColor(props.theme.colors.pageBackground.light, 0.15),
                    },
                    _active: {
                        bg:
                            props.colorMode === "dark"
                                ? lightenColor(props.theme.colors.pageBackground.dark, 0.3)
                                : darkenColor(props.theme.colors.pageBackground.light, 0.2),
                    },
                }),
            },
        },
    },
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#3a0338",
        },
        contentBackground: {
            light: "#EDF2F7",
            dark: "#4c044a",
        },
        red: "#ce4910",
        green: "#0b8f1e",
    },
})

export default customTheme
