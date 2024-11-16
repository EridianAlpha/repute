import { useState } from "react"

import { VStack, HStack, Text, Box, Image, Input, Button, Link } from "@chakra-ui/react"
import NextLink from "next/link"

import { useAccount } from "wagmi"

import RegisterOracleButton from "./RegisterOracleButton"
import EncryptVoteButton from "./EncryptVoteButton"
import SubmitEncryptedVoteButton from "./SubmitEncryptedVoteButton"

import CurrentAddressInfo from "./wallet/CurrentAddressInfo"
import ConnectWalletButton from "./wallet/ConnectWalletButton"

const OracleIcon = ({ oracle }) => {
    return (
        <HStack w={"100%"} gap={3}>
            <Text fontWeight={"bold"}>{oracle.id}</Text>
            <Box bg={"green"} boxSize={"50px"} borderRadius={"full"} overflow={"hidden"}>
                <Image src={oracle.image} alt="Oracle Image" />
            </Box>
            <HStack gap={0} w={"100%"} h={"30px"} borderRadius={"full"} overflow={"hidden"}>
                <Box bg="green" w={`${oracle.volumeWon}%`} h={"100%"} pt={"2px"} pl={"8px"}>
                    <Text fontWeight="bold" overflow="hidden" whiteSpace="nowrap" zIndex={"10"}>
                        👍 ${oracle.volumeWon}k
                    </Text>
                </Box>
                <Box bg="red" w={`${oracle.volumeLost}%`} h={"100%"} textAlign={"end"} pr={"8px"}>
                    {/* <Text fontWeight={"bold"} h={"100%"} pt={"2px"}>
                        ${oracle.volumeLost}k 👎
                    </Text> */}
                </Box>
            </HStack>
        </HStack>
    )
}

export default function VoteContainer({ wagmiProviderConfig, projects, vote, oracles }) {
    const project = projects.find((project) => project.id == vote.projectId)

    const [isOracleRegistered, setIsOracleRegistered] = useState(false)
    const [valueToEncrypt, setValueToEncrypt] = useState("")
    const [signedMessage, setSignedMessage] = useState("")
    const [oracleVoted, setOracleVoted] = useState(false)

    const { isConnected } = useAccount()

    return (
        <VStack w={"100vw"} alignItems={"center"} justifyContent={"space-around"}>
            <HStack w={"100vw"} alignItems={"start"} justifyContent={"space-around"}>
                <VStack gap={5} minW={"350px"}>
                    <VStack gap={3} border={"2px solid white"} borderRadius={"20px"} p={3} w={"100%"} className={"pageContent"}>
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
                    <VStack gap={3} border={"2px solid white"} borderRadius={"20px"} p={3} w={"100%"} className={"pageContent"}>
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
                        <>
                            {!isOracleRegistered ? (
                                <HStack
                                    border={"2px solid white"}
                                    borderRadius={"20px"}
                                    p={3}
                                    w={"100%"}
                                    justifyContent={"center"}
                                    className={"pageContent"}
                                >
                                    <RegisterOracleButton wagmiProviderConfig={wagmiProviderConfig} setIsOracleRegistered={setIsOracleRegistered} />
                                </HStack>
                            ) : (
                                isConnected && (
                                    <VStack gap={3} border={"2px solid white"} borderRadius={"20px"} p={3} w={"100%"} className={"pageContent"}>
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
                                                    setOracleVoted(false)
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
                                        {signedMessage && !oracleVoted && (
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
                                                        borderRadius={"10px"}
                                                    >
                                                        {signedMessage}
                                                    </Text>
                                                </VStack>
                                                <SubmitEncryptedVoteButton
                                                    wagmiProviderConfig={wagmiProviderConfig}
                                                    signedMessage={signedMessage}
                                                    setOracleVoted={setOracleVoted}
                                                />
                                            </>
                                        )}

                                        {signedMessage && oracleVoted && <Text>Wait to reveal...</Text>}
                                    </VStack>
                                )
                            )}
                        </>
                    )}
                </VStack>
                <VStack gap={5}>
                    {isConnected ? <CurrentAddressInfo /> : <ConnectWalletButton />}
                    <VStack border={"2px solid white"} borderRadius={"20px"} p={3} w={"100%"} className={"pageContent"} textAlign={"center"}>
                        <Text fontWeight={"bold"}>
                            Vote: {vote.id} - {project.name} - {vote.name}
                        </Text>
                        <Text>{vote.description}</Text>
                        <VStack>
                            <Image src="./images/DataSet3.png" alt="DataSet1" maxW={"250px"} borderRadius={"30px"} />
                        </VStack>

                        <Text>
                            IPFS Hash:{" "}
                            <Link
                                className="bgPage"
                                py={"2px"}
                                px={"8px"}
                                borderRadius={"full"}
                                as={NextLink}
                                href={`https://ipfs.io/ipfs/${vote.ipfsHash}`}
                                textDecoration={"underline"}
                                target="_blank"
                            >
                                {vote.ipfsHash}
                            </Link>
                        </Text>
                    </VStack>
                </VStack>
                <VStack minW={"300px"} border={"2px solid white"} borderRadius={"20px"} p={3} className={"pageContent"}>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                        Who&apos;s voted so far?
                    </Text>
                    <VStack justifyContent={"start"} w={"100%"}>
                        {oracles && oracles.map((oracle) => <OracleIcon key={oracle.id} oracle={oracle} />)}
                    </VStack>
                </VStack>
            </HStack>
        </VStack>
    )
}
