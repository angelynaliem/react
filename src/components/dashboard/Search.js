import React, { useState, useEffect } from "react";
import dummyData from "./dummyData";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "./Dashboard.css";

const Search = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  // const [searchResults, setSearchResults] = useState(dummyData)

  // useEffect(() => {

  //   const results = dummyData.filter((item) => {
  //     return item.toLowerCase().includes(searchTerm.toLowerCase()) || item.toLowerCase().includes(searchTerm.toLowerCase())

  //   });

  //   setSearchResults(results)
  // }, [searchTerm]);

  // const handleChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="searchBar"></Label>
          <Input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Search"
            // onChange={handleChange}
            // value={searchTerm}
          />
        </FormGroup>
      </Form>
      {/* <div>
      <ul>
          {searchResults.map((item) => (
            <li key={item.ticketNumber}>{item.ticketNumber}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Search;
