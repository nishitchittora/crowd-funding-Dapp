import React, {useState, useEffect} from 'react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import { Card, Button } from 'semantic-ui-react';

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
    <div>
        {renderCampaign()}
        <Button
            content="Create Campaign"
            icon="add circle"
            primary
        />
    </div>
  );
}


CampaignIndex.getInitialProps = async ({ query }) => {
    return {campaigns: await factory.methods.getDeployedCampaigns().call()};
}

export default CampaignIndex;
