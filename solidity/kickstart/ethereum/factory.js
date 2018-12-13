import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),
    '0x89acf7B096A7859657c56Eea8506BE0943d4fE89'
);


export default instance;
