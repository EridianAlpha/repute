import { useState } from "react"

import { VStack, HStack, Text, Box, Image, Input, Button } from "@chakra-ui/react"
import { useAccount } from "wagmi"

import EncryptVoteButton from "./EncryptVoteButton"

const OracleIcon = ({ oracle }) => {
    return (
        <Box bg={"green"} boxSize={"50px"} borderRadius={"full"} overflow={"hidden"}>
            <Image src={oracle.image} alt="Oracle Image" />
        </Box>
    )
}

export default function VoteContainer({ projects, vote, oracles }) {
    const project = projects.find((project) => project.id == vote.projectId)

    const [valueToEncrypt, setValueToEncrypt] = useState("")
    const [signedMessage, setSignedMessage] = useState("")

    const { isConnected } = useAccount()

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
                    {isConnected && (
                        <VStack gap={3} border={"2px solid white"} borderRadius={"20px"} p={3} w={"100%"}>
                            <HStack w={"100%"} flexGrow={1} justifyContent={"space-between"} px={3}>
                                <Text fontWeight={"bold"} fontSize={"2xl"}>
                                    VOTE
                                </Text>
                                <Button
                                    borderRadius={"full"}
                                    h={"30px"}
                                    onClick={() => {
                                        setSignedMessage("")
                                        setValueToEncrypt(null)
                                    }}
                                >
                                    <Text fontSize={"lg"}>🔄 Reset</Text>
                                </Button>
                            </HStack>
                            {!signedMessage && (
                                <>
                                    <Input
                                        placeholder="Enter a value from 0 - 100"
                                        borderRadius={"10px"}
                                        maxW={"250px"}
                                        onChange={(e) => setValueToEncrypt(e.target.value)}
                                    />
                                    <EncryptVoteButton valueToEncrypt={valueToEncrypt} setSignedMessage={setSignedMessage} />
                                </>
                            )}
                            {signedMessage && (
                                <>
                                    <VStack gap={0}>
                                        <Text className={"codeBackground"} px={3} pt={1} borderTopRadius={"10px"} fontWeight={"bold"}>
                                            Encrypted vote
                                        </Text>
                                        <Text
                                            maxW={"350px"}
                                            wordBreak={"break-word"}
                                            fontFamily={"monospace"}
                                            fontSize={"md"}
                                            p={3}
                                            className={"codeBackground"}
                                        >
                                            {signedMessage}
                                        </Text>
                                    </VStack>
                                    <Button isDisabled={true}>
                                        <Text>🗳️ Submit encrypted vote</Text>
                                    </Button>
                                </>
                            )}
                        </VStack>
                    )}
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
