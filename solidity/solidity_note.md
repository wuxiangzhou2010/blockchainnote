assert 
ganache
truffle-hdwallet-provider
mocha fucntions 

    it              run  a test and make an assertion 
    describe        groups together 'it' fucntions
    beforeEach      execute some general setup code

        () => 
        async wait



solidity 

    function modifier

    modifier restricted() {
        retuqire(msg.sender == manager)
        _;
    }
