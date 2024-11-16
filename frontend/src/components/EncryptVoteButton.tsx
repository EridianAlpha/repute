import { Text, Button } from "@chakra-ui/react"
import { useAccount, useSignMessage } from "wagmi"
import { ethers, AbiCoder } from "ethers"

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
            console.log("connectedWalletAddress: ", connectedWalletAddress)

            const abiTypes = ["uint256", "uint256", "uint256"]
            const values = [1, 1, valueToEncrypt]

            const abiCoder = new AbiCoder()

            const encodedMessage = abiCoder.encode(abiTypes, values)
            console.log("encodedMessage: ", encodedMessage)

            const messageHash = ethers.keccak256(encodedMessage)
            console.log("messageHash: ", messageHash)

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
