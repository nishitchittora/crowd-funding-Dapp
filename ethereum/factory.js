import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';


const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x85bDD0e8576653E6c11C0A1D1883798816d6f7D5"
);

export default instance;
