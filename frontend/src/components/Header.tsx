import {
    Box,
    Text,
    HStack,
    VStack,
    Image,
    Tooltip,
    Button,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

function HeaderButtons({ displayZone }) {
    return (
        <>
            {displayZone == "drawer" && (
                <Text fontWeight={"bold"} pl={1} pt={1} fontSize={"lg"}>
                    Links
                </Text>
            )}
            <Link href={"https://github.com/EridianAlpha/repute"} target="_blank">
                <Button variant={"HeaderButton"} aria-label={"View GitHub Source"} borderRadius={"full"} p={2}>
                    <HStack gap={3}>
                        <FontAwesomeIcon icon={faGithub} size={"xl"} />
                        {displayZone == "drawer" && <Text pr={1}>GitHub</Text>}
                    </HStack>
                </Button>
            </Link>
            {displayZone == "drawer" && (
                <Text fontWeight={"bold"} pl={1} pt={3} fontSize={"lg"}>
                    Settings
                </Text>
            )}
        </>
    )
}

export default function Header({}) {
    const isSSR = typeof window === "undefined"
    const { isOpen, onOpen, onClose } = useDisclosure()

    function navigateHome() {
        if (!isSSR) {
            window.history.replaceState({}, "", `${window.location.pathname}`)
            window.location.reload()
        }
    }

    return (
        <HStack width="100%" borderBottomWidth={1} className={"borderColorDivider"} justifyContent={"center"}>
            <Box width="100%" px={{ base: "10px", md: "3rem" }} maxW="1780px">
                <Box className={"bgPage"}>
                    <HStack h={16} alignItems={"center"} justifyContent={"space-between"}>
                        <HStack spacing={3} alignItems={"center"} cursor={"pointer"} onClick={navigateHome}>
                            <Image
                                onClick={navigateHome}
                                sx={{ cursor: "pointer" }}
                                width={"40px"}
                                objectFit={"cover"}
                                src={"images/ReputeLogo.png"}
                                borderRadius={"10px"}
                                alt={"Repute Logo"}
                            />
                            <Box pr={2} minW={"fit-content"} fontWeight="extrabold" fontSize="xl" whiteSpace="nowrap" overflow="hidden">
                                Repute - A reputation based dispute resolution protocol
                            </Box>
                        </HStack>
                        <HStack display={{ base: "none", sm: "flex" }} spacing={5}>
                            <HeaderButtons displayZone={"header"} />
                        </HStack>
                        <Button
                            variant={"HeaderButton"}
                            aria-label="Open Menu"
                            display={{ base: "flex", sm: "none" }}
                            onClick={onOpen}
                            borderRadius={"full"}
                            p={0}
                        >
                            <FontAwesomeIcon icon={faBars} size={"lg"} />
                        </Button>
                    </HStack>
                </Box>
            </Box>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <VStack spacing={5} alignItems={"start"}>
                            <HeaderButtons displayZone={"drawer"} />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </HStack>
    )
}
