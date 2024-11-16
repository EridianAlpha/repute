import Header from "./Header"

import { Box, VStack, useColorModeValue } from "@chakra-ui/react"

import ContentContainer from "./ContentContainer"

import "@rainbow-me/rainbowkit/styles.css"

import { darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { http, createConfig, WagmiProvider } from "wagmi"
import { anvil, holesky, baseSepolia } from "wagmi/chains"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const App = () => {
    const colorMode = useColorModeValue("light", "dark")

    const wagmiProviderConfig = createConfig({
        chains: [anvil, holesky, baseSepolia],
        transports: {
            [anvil.id]: http(),
            [holesky.id]: http(),
            [baseSepolia.id]: http(),
        },
    })

    // Create queryClient for RainbowKit
    const queryClient = new QueryClient()

    return (
        <VStack minH={"100vh"} minW={"100vw"} className={"bgPage"} gap={0}>
            <VStack minW={"100vw"} justifyContent="center" alignItems="center" gap={0} zIndex={10}>
                <Header />
                <VStack alignItems={"center"} minW={"100vw"} gap={0}>
                    <WagmiProvider config={wagmiProviderConfig}>
                        <QueryClientProvider client={queryClient}>
                            <RainbowKitProvider modalSize="compact" theme={colorMode === "dark" ? darkTheme() : lightTheme()}>
                                <ContentContainer wagmiProviderConfig={wagmiProviderConfig} />
                            </RainbowKitProvider>
                        </QueryClientProvider>
                    </WagmiProvider>
                    <Box height={30} />
                </VStack>
            </VStack>
        </VStack>
    )
}

export default App
