import React from "react";
import Table from 'react-bootstrap/Table';

function ResultList(props) {

  return (
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Picture</th>
      <th><button onClick={() => props.sortByName(props.results)}>Name</button></th>
      <th>Username</th>
      <th>Email</th>
      <th>Phone</th>
      <th>City</th>
      <th>State</th>
    </tr>
  </thead>
  <tbody>
    {props.results && props.results.map(result => (
    <tr key={result.id.value}>
      <td><img alt={result.name.last} className="img-fluid" src={result.picture.thumbnail} /></td>
      <td>{result.name.first} {result.name.last}</td>
      <td>{result.login.username}</td>
      <td>{result.email}</td>
      <td>{result.phone}</td>
      <td>{result.location.city}</td>
      <td>{result.location.state}</td>
    </tr>
    ))}
  </tbody>
</Table>
);
}

export default ResultList;