import Header from "./Header"

import { Box, Flex, Text } from "@chakra-ui/react"

import ContentContainer from "./ContentContainer"

const App = () => {
    return (
        <Box minH="100vh" className={"bgPage"} display="flex" flexDirection="column">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header />
                <Flex direction={"column"} alignItems={"center"} maxW={"100vw"} w={"1150px"} px={{ base: "0px", sm: "2vw", xl: "3vw", "2xl": "3vw" }}>
                    <ContentContainer />
                </Flex>
            </Flex>
        </Box>
    )
}

export default App
