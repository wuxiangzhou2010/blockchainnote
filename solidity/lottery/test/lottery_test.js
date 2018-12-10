const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());//setup the provider
const { interface, bytecode } = require('../compile')

let accounts;
let lottery;
beforeEach(async () => {
    // get a list of accounts

    accounts = await web3.eth.getAccounts();
    // .then(fetchdAccounts=>{
    //     console.log(fetchdAccounts);

    //use one of the accounts to deploy the contract
    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })
}
);


describe('lottery', () => {
    it('deploys a contract', () => {
        // console.log(lottery);
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async()=> {
        await lottery.methods.enter().send({
            from:accounts[0],
            value: web3.utils.toWei('0.2', 'ether')
        });
        const players = await lottery.methods.getplayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0],players[0]);
        assert.equal(1,players.length);
    });
    

    it('allows multiple accounts to enter', async()=> {
        await lottery.methods.enter().send({
            from:accounts[0],
            value: web3.utils.toWei('0.2','ether')
        });
        await lottery.methods.enter().send({
            from:accounts[1],
            value: web3.utils.toWei('0.2','ether')
        });
        await lottery.methods.enter().send({
            from:accounts[2],
            value: web3.utils.toWei('0.2','ether')
        });
        const players = await lottery.methods.getplayers().call({
            from: accounts[0]
        })

        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        assert.equal(accounts[2],players[2]);
        assert.equal(3,players.length);
    });
    
it('only manager can call pickWinner', async() => {
    try {
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        });
        assert(false);
    }catch (err) {
        assert(err);
    }
});
it('sends money to the winner and resets the player array', async()=> {
    await lottery.methods.enter().send({
        from:accounts[0],
        value: web3.utils.toWei('2','ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({
        from:accounts[0]
    });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    assert(difference >web3.utils.toWei('1.8', 'ether'));

});

// it('require a minium amount of ether to enter', async ()=> {
//    try {
//     await lottery.methods.enter().send({
//         from: accounts[0],
//         value: 0
//     });
//     assert(false);
//    } catch (err) {
//        assert.ok(err);
//    }
// });
    // it('has a default message', async () => {
    //     const message = await lottery.methods.message().call();
    //     assert.equal(message, 'Hi there!');
    // });
    // it('can change the message', async () => {
    //     await lottery.methods.setMessage('bye').send({ from: accounts[0] });
    //     const message = await lottery.methods.message().call();
    //     assert.equal(message, 'bye')
    // });
});




// class Car {
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }
// /*******************************/
// let car
// beforeEach(()=>{
//     car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         // const car = new Car();
//         assert.equal(car.park(), 'stopped')
//     });
//     it('can drive', () => {
//         // const car = new Car();
//         assert.equal(car.drive(), 'vroom');
//     });
// });