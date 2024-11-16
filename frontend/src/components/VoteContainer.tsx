import { VStack, HStack, Text, Box, Image, Input, Button } from "@chakra-ui/react"

const OracleIcon = ({ oracle }) => {
    return (
        <Box bg={"green"} boxSize={"50px"} borderRadius={"full"} overflow={"hidden"}>
            <Image src={oracle.image} alt="Oracle Image" />
        </Box>
    )
}

export default function VoteContainer({ projects, vote, oracles }) {
    const project = projects.find((project) => project.id == vote.projectId)

    return (
        <VStack w={"100vw"} alignItems={"center"} justifyContent={"space-around"}>
            <Text>
                Vote: {vote.id} - {project.name} - {vote.name}
            </Text>
            <HStack w={"100vw"} alignItems={"center"} justifyContent={"space-around"}>
                <VStack gap={5} minW={"350px"}>
                    <VStack gap={3} border={"2px solid white"} borderRadius={"20px"} p={3} w={"100%"}>
                        <HStack gap={3} w={"100%"}>
                            <Image src={project.image} alt={"Project Logo"} boxSize={"60px"} borderRadius={"full"} />
                            <VStack fontWeight={"bold"} textAlign={"start"} gap={1}>
                                <Text w={"100%"}>{project.name}</Text>
                                <Text w={"100%"}>{project.tagLine}</Text>
                            </VStack>
                        </HStack>
                        <VStack w={"100%"} gap={"1px"}>
                            <HStack gap={0} w={"100%"} h={"30px"} borderRadius={"full"} overflow={"hidden"}>
                                <Box bg="green" w={"70%"} h={"100%"} pt={"2px"} pl={"8px"}>
                                    <Text fontWeight={"bold"}>👍 $70k</Text>
                                </Box>
                                <Box bg="red" w={"30%"} h={"100%"} textAlign={"end"} pr={"8px"}>
                                    <Text fontWeight={"bold"} h={"100%"} pt={"2px"}>
                                        $30k 👎
                                    </Text>
                                </Box>
                            </HStack>
                        </VStack>
                    </VStack>
                    <VStack gap={3} border={"2px solid white"} borderRadius={"20px"} p={3} w={"100%"}>
                        <VStack gap={0}>
                            <Text fontWeight={"bold"} fontSize={"2xl"}>
                                Vote Prize Pool
                            </Text>
                            <Text fontWeight={"bold"} fontSize={"4xl"} color={"green"}>
                                $1,000
                            </Text>
                        </VStack>
                    </VStack>
                    <VStack gap={3} border={"2px solid white"} borderRadius={"20px"} p={3} w={"100%"}>
                        <Text fontWeight={"bold"} fontSize={"2xl"}>
                            VOTE
                        </Text>
                        <Input placeholder="Enter a value from 0 - 100" borderRadius={"10px"} maxW={"250px"} />
                        <Button>
                            <Text>🔒 Encrypt vote</Text>
                        </Button>
                        <VStack gap={0}>
                            <Text className={"codeBackground"} px={3} pt={1} borderTopRadius={"10px"} fontWeight={"bold"}>
                                Encrypted vote
                            </Text>
                            <Text maxW={"350px"} wordBreak={"break-word"} fontFamily={"monospace"} fontSize={"md"} p={3} className={"codeBackground"}>
                                0x49dce40b6397f1f66d795efc7bd9422e2043ef3d347f07c259c16392a5cffb88778cb0936ac9b4f0164be0c3ef489396d916d03c17c5dcd99b5b0eaee89189bb1c
                            </Text>
                        </VStack>
                        <Button isDisabled={true}>
                            <Text>🗳️ Submit encrypted vote</Text>
                        </Button>
                    </VStack>
                </VStack>
                <HStack>
                    <Text>Chart</Text>
                </HStack>
                <VStack>
                    <Text>Who&apos;s voted so far?</Text>
                    <HStack>{oracles && oracles.map((oracle) => <OracleIcon key={oracle.id} oracle={oracle} />)}</HStack>
                </VStack>
            </HStack>
        </VStack>
    )
}
