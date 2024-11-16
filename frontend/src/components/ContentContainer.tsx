import { VStack } from "@chakra-ui/react"

import VoteContainer from "./VoteContainer"

import { useAccount } from "wagmi"

const projects = [
    { id: 17, name: "Arbon", tagLine: "Carbon Tokens Onchain", image: "./images/ArbonLogo.jpeg", totalPaidOut: 1_000_000, totalRugged: 5_000 },
]
const votes = [
    {
        id: 914,
        projectId: 17,
        name: "Borneo Forest (4.995400, -52.527494) - November 2024",
        description: "Vote on the percentage tree coverage in this 1km square of Amazon forest.",
        ipfsHash: "QmWca5UoN3hHdAMtJCiDyaLAPgdEy7eDLu6XGqQtoNq5f3",
    },
]
const oracles = [
    { id: 1, image: "./images/PFP1.png", volumeWon: 100, volumeLost: 0, volumePending: 50 },
    { id: 2, image: "./images/PFP2.png", volumeWon: 50, volumeLost: 50, volumePending: 50 },
    { id: 3, image: "./images/PFP3.jpg", volumeWon: 35, volumeLost: 65, volumePending: 50 },
    { id: 4, image: "./images/PFP4.jpg", volumeWon: 90, volumeLost: 10, volumePending: 50 },
    { id: 5, image: "./images/PFP5.png", volumeWon: 95, volumeLost: 5, volumePending: 50 },
]

export default function ContentContainer({ wagmiProviderConfig }) {
    const { isConnected } = useAccount()

    return (
        <VStack w={"100vw"} alignItems={"center"} gap={0} px={3} pt={"20px"}>
            {/* Hardcode vote.id to 914 */}
            <VoteContainer
                wagmiProviderConfig={wagmiProviderConfig}
                projects={projects}
                vote={votes.find((vote) => (vote.id = 914))}
                oracles={oracles}
            />
        </VStack>
    )
}
