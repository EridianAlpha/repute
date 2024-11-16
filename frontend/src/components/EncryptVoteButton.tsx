import { useState } from "react"

import { Text, Button } from "@chakra-ui/react"
import { useAccount, useSignMessage } from "wagmi"
import { ethers } from "ethers"

import config from "public/data/config.json"

export default function EncryptVoteButton({ valueToEncrypt, setSignedMessage }) {
    const { signMessageAsync } = useSignMessage()

    const { address: connectedWalletAddress } = useAccount()

    const encryptVote = async () => {
        if (!valueToEncrypt) {
            console.error("No value to encrypt.")
            return
        }

        try {
            console.log("Encrypting vote: ", valueToEncrypt)
            const messageHash = ethers.hashMessage(valueToEncrypt)
            const signedMessage = await signMessageAsync({ account: connectedWalletAddress, message: messageHash })

            console.log("Signed message: ", signedMessage)
            setSignedMessage(signedMessage)
        } catch (error) {
            console.error("Error encrypting vote: ", error)
        }
    }

    return (
        <Button onClick={encryptVote} isDisabled={!valueToEncrypt}>
            <Text>🔒 Encrypt vote</Text>
        </Button>
    )
}
