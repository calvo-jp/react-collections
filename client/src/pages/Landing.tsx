import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import IPurok from "../types/purok";

const GET_PUROKS = gql`
  query getPuroks {
    puroks {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

const Landing: React.FC = () => {
  const { loading, error, data } = useQuery<IPurok>(GET_PUROKS);

  if (loading) return <div className="p-2">Loading...</div>;
  if (error) return <div className="p-2">{error.message}</div>;
  if (!data) return <div className="p-2">Something went wrong</div>;

  console.log(data);

  return <div className="p-2"></div>;
};

export default Landing;
