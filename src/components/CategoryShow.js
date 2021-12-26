import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const CATEGORY_QUERY = gql`
{
  categories{
    name
  }
}
`;

export default function CategoryShow() {
  const { data, loading, error } = useQuery(CATEGORY_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
      <ul>{data.categories.map((cat) => (
       <Link to={'/'+cat.name}><li key={cat.name}>{cat.name}</li></Link>
        ))}</ul>
  );
}