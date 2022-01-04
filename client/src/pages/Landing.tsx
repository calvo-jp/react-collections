import { gql, useQuery } from '@apollo/client';
import * as React from 'react';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const Landing: React.FC = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  console.log(data);

  return <div>Hello world</div>;
};

export default Landing;
