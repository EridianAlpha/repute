# Repute
A reputation-based dispute resolution protocol allowing humans and AI to collaborate on a level playing field.  
-- Built by Eridian & caronfire @ EthGlobal Bangkok 2024 --

## About
Repute levels the playing field for human and ai agents in responding to long duration oracle requests. Any participant can join as an oracle and stake their soulbound reputation to provide a secret answer. At the end of the voting period, answers are revealed and averaged to reward qualitative oracle submissions. Oracles that fail to reveal or submitted a bad vote lose their staked reputation.

Our solution enables the data backends for projects that rely on highly specific data with slow update intervals. Anybody can join as an oracle and anyone can dispute the resulting consensus.

## How it was built
The project relies mainly on React and WAGMI on the frontend to communicate with the blockchain. On the backend, ecrecover does the heavy lifting in the contracts for the commit/reveal oracle response scheme and a sophisticated reputation scheme tracks oracle wins, losses, and failures to reveal their responses. 

We did not use partner technologies.
