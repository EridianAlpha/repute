import Header from "./Header"

import { Box, Flex, Text } from "@chakra-ui/react"

const App = () => {
    return (
        <Box minH="100vh" className={"bgPage"} display="flex" flexDirection="column">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header />
                <Flex direction={"column"} alignItems={"center"} maxW={"100vw"} w={"1150px"} px={{ base: "0px", sm: "2vw", xl: "3vw", "2xl": "3vw" }}>
                    <Box height={30} />
                    <Text fontWeight={"extrabold"} fontSize={"3xl"} textAlign={"center"}>
                        Repute
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default App
