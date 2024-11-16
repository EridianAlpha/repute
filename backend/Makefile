# ================================================================
# │                 GENERIC MAKEFILE CONFIGURATION               │
# ================================================================
-include .env

.PHONY: test

help:
	@echo "Usage:"
	@echo "  make deploy anvil\n

# ================================================================
# │                      NETWORK CONFIGURATION                   │
# ================================================================
get-network-args: $(word 2, $(MAKECMDGOALS))-network

anvil: # Added to stop error output when running commands e.g. make deploy anvil
	@echo
anvil-network:
	$(eval \
		NETWORK_ARGS := --broadcast \
						--rpc-url ${ANVIL_RPC_URL} \
						--private-key ${ANVIL_PRIVATE_KEY} \
	)

# ================================================================
# │                    LOCAL TESTING AND COVERAGE                │
# ================================================================
test:; forge test
test-v:; forge test -vvvv
test-summary:; forge test --summary

coverage:
	@forge coverage --report summary --report lcov 
	@echo

coverage-report:
	@forge coverage --report debug > coverage-report.txt
	@echo Output saved to coverage-report.txt

# ================================================================
# │                     FORK TESTING AND COVERAGE                │
# ================================================================
test-fork:; forge test --fork-url ${FORK_RPC_URL}
test-v-fork:; forge test --fork-url ${FORK_RPC_URL} -vvvv
test-summary-fork:; forge test --fork-url ${FORK_RPC_URL} --summary

coverage-fork:
	@forge coverage --fork-url ${FORK_RPC_URL} --report summary --report lcov 
	@echo

coverage-report-fork:
	@forge coverage --fork-url ${FORK_RPC_URL} --report debug > coverage-report-fork.txt
	@echo Output saved to coverage-report-fork.txt

# ================================================================
# │                CONTRACT SPECIFIC CONFIGURATION               │
# ================================================================
install:
	forge install foundry-rs/forge-std@v1.9.2 --no-commit

# ================================================================
# │                    RUN COMMANDS - DEPLOYMENT                 │
# ================================================================
deploy-script:; @forge script script/Deploy.s.sol:Deploy --sig "run()" ${NETWORK_ARGS} -vvvv
deploy: get-network-args \
	deploy-script
