import { Flex, Text } from "@chakra-ui/react"

export default function Footer() {
    return (
        <Flex direction={"column"} alignItems={"center"} pb={5} px={3} gap={1}>
            <Text fontWeight={"bold"}>Footer Template</Text>
        </Flex>
    )
}
