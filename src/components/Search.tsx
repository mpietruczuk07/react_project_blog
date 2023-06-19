import React from "react";
import {MDBBtn} from "mdb-react-ui-kit";

interface SearchTypes{
    handleSearch:any,
    searchValue:any,
    onInputChange:any,
}

const Search = ({handleSearch, searchValue, onInputChange}:SearchTypes) => {
    return(
        <div className="searchForm">
            <form className="d-flex" onSubmit={handleSearch}>
                <input type="search" className="form-control" placeholder="Search post..." value={searchValue} onChange={onInputChange}/>
                <MDBBtn type="submit">Search</MDBBtn>
            </form>
        </div>
    )
}

export default Search;