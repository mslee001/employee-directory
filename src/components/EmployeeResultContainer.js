import React, { Component } from "react";
import Header from "./Header";
import Table from 'react-bootstrap/Table';
import API from "../utils/API";

class EmployeeResultContainer extends Component {
    state = {
        data: [],
        sort: {
            column: "Name",
            direction: "asc"
        },
        filter: [],
        searchValue: ""
    } 

    componentDidMount() {
        this.populateEmployees();
    };
        
    populateEmployees = () => {
        API.getUsers()
            .then(res => this.setState({ data: res.data.results, filter: res.data.results }))
            .catch(err => console.log(err));
    }

    onSort = (column) => (e) => {
        const newOrder = this.state.sort.column ? (this.state.sort.direction === "asc" ? "desc" : "asc") : "desc";
        const sortedData = this.state.data.sort((currentSpot, nextSpot) => {
            if (column === "Name") {
                const nameA = currentSpot.name.first; 
                const nameB = nextSpot.name.first; 
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            }
        });

        if (newOrder === "desc") {
            sortedData.reverse();
        }

        this.setState({
            data: sortedData,
            sort: {
                column,
                newOrder,
            }
        });
    }

    handleInputChange = event => {
        const value = event.target.value.toLowerCase();
        // const filter = event.target.name;
        this.setState({
            searchValue: value
        });
        this.filterNames(value);
    };

    filterNames (inputValue) {
        const { data } = this.state;
        this.setState({
            filter: data.filter(item =>
                item.name.first.toLowerCase().includes(inputValue))
        });
    }

    render () {
        return (
            <div className="container-fluid">
            <Header />
                <form className="form-inline d-flex justify-content-center md-form form-sm m-4">
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search for Employees"
                        aria-label="Search" onChange={this.handleInputChange}/>
                </form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Picture</th>
                            <th onClick={this.onSort("Name")}>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filter.map(result => (
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
                </div>
            )
        }
    
}

export default EmployeeResultContainer;