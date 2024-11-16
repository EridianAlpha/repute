import { Text, Button, VStack } from "@chakra-ui/react"
import { useConnectModal } from "@rainbow-me/rainbowkit"

export default function ConnectWalletButton() {
    const { openConnectModal } = useConnectModal()

    return (
        <VStack gap={0}>
            <Button
                minH="50px"
                maxW="300px"
                w="100%"
                px={8}
                variant="solid"
                fontSize="2xl"
                borderRadius="full"
                h={"fit-content"}
                whiteSpace="normal"
                textAlign="center"
                onClick={openConnectModal}
                fontWeight={"extrabold"}
            >
                <VStack gap={1}>
                    <Text>Connect wallet</Text>
                </VStack>
            </Button>
        </VStack>
    )
}
