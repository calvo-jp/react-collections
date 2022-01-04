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

  if (loading) return <div className="p-2">Loading...</div>;
  if (error) return <div className="p-2">{error.message}</div>;
  if (!data) return <div className="p-2">Something went wrong</div>;

  return <div className="p-2">{data.hello}</div>;
};

export default Landing;
