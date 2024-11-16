import { VStack, HStack, Text, Box, Image } from "@chakra-ui/react"

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
                <VStack gap={3} border={"2px solid white"} borderRadius={"20px"} p={3} minW={"350px"}>
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
