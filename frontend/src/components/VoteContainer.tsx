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

    const calculateProjectReputation = () => {
        const paidOutPercentage = project.totalPaidOut
    }

    return (
        <VStack w={"100vw"} alignItems={"center"} justifyContent={"space-around"}>
            <Text>
                Vote: {vote.id} - {project.name} - {vote.name}
            </Text>
            <HStack w={"100vw"} alignItems={"center"} justifyContent={"space-around"}>
                <VStack>
                    <HStack>
                        <Image src={project.image} alt={"Project Logo"} boxSize={"60px"} borderRadius={"full"} />
                        <Text>
                            {project.name} - {project.tagLine}
                        </Text>
                    </HStack>
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
