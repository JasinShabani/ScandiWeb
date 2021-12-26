import React from "react";
import { useQuery, gql } from "@apollo/client";

const PRODUCT_QUERY = gql`
{
  category{
    name
    products{
      id
      name
    }
  }
}

`;

export default function Category() {
  const { data, loading, error } = useQuery(PRODUCT_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  console.log(data.category);
  console.log(data.category.products.map((product) => product));
  return (
    <div>
      <h1>Category</h1>
      <ul>
      <li>{data.category.name}</li>
      <li>{data.category.product}</li>
      {data.category.products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}