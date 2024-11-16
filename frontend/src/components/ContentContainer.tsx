import { HStack, Text, Box } from "@chakra-ui/react"

import VoteContainer from "./VoteContainer"

const projects = [
    { id: 17, name: "Arbon", tagLine: "Carbon Tokens Onchain", image: "./images/ReputeLogo.png", totalPaidOut: 1_000_000, totalRugged: 5_000 },
]
const votes = [{ id: 914, projectId: 17, name: "Borneo Forest 12345 581902 - November 2024" }]
const oracles = [
    { id: 1, image: "./images/PFP1.png", volumeWon: 100, volumeLost: 20, volumePending: 50 },
    { id: 2, image: "./images/PFP2.png", volumeWon: 100, volumeLost: 20, volumePending: 50 },
    { id: 3, image: "./images/PFP1.png", volumeWon: 100, volumeLost: 20, volumePending: 50 },
    { id: 4, image: "./images/PFP2.png", volumeWon: 100, volumeLost: 20, volumePending: 50 },
    { id: 5, image: "./images/PFP1.png", volumeWon: 100, volumeLost: 20, volumePending: 50 },
]

export default function ContentContainer() {
    return (
        <HStack w={"100vw"} alignItems={"center"} gap={0} px={3} pt={"20px"}>
            {/* Hardcode vote.id to 914 */}
            <VoteContainer projects={projects} vote={votes.find((vote) => (vote.id = 914))} oracles={oracles} />
        </HStack>
    )
}
