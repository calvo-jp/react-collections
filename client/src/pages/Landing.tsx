import { gql, useQuery } from "@apollo/client";
import * as React from "react";

interface Response {
  hello: string;
}

const GET_HELLO = gql`
  query getHello {
    hello
  }
`;

const Landing: React.FC = () => {
  const { loading, error, data } = useQuery<Response>(GET_HELLO);

  if (loading) console.log(loading);
  if (error) console.log(error.message);
  if (data) console.log(data.hello);

  return <div>Hello world</div>;
};

export default Landing;
