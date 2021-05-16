import React, {useState, useEffect} from 'react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';


const CampaignIndex = ({campaigns}) =>{
  // const [campaign, setCampaign] = useState(null);
  //
  // useEffect(async() => {
  //       const campaign = await factory.methods.getDeployedCampaigns().call();
  //       setCampaign(campaign)
  // }, []);
  const renderCampaign = ()=>{
      const items = campaigns.map(address => {
          return {
              header: address,
              description: <a>View description</a>,
              fluid: true
          };
      });

      return <Card.Group items={items} />
  }

  return (
    <Layout>
        <div>
            {renderCampaign()}
            <Button
                content="Create Campaign"
                icon="add circle"
                primary
            />
        </div>
    </Layout>
  );
}


CampaignIndex.getInitialProps = async ({ query }) => {
    return {campaigns: await factory.methods.getDeployedCampaigns().call()};
}

export default CampaignIndex;
