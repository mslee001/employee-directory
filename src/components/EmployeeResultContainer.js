import React, { useState, useEffect } from "react";
// import FilterList from "./FilterList";
import ResultList from "./ResultList";
import API from "../utils/API";

function EmployeeResultContainer() {
    // const [search, setSearch] = useState();
    const [employees, setEmployees] = useState();

    useEffect(() => {
        API.getUsers(employees)
            .then(
                res => setEmployees(res.data.results))
            .catch(err => console.log(err));
    }, []);

    console.log(employees);

    function getIndexToIns(args) {
        let newResults = {...employees};
        const handleSort = (currentSpot, nextSpot) => {
            if (currentSpot.name.first > nextSpot.name.first) {
                return 1;
            }
            return -1;
        }    
        console.log("clicked");
        newResults = args.sort(handleSort);
        setEmployees(newResults);
    }

        return (
            <div>
                {/* <FilterList
                search={this.state.search}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                /> */}
                <ResultList results={employees} 
                sortByName={getIndexToIns}
                />
            </div>
        )
}

export default EmployeeResultContainer;