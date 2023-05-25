import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./slices/user-slice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.data);
  // const isLoading = useSelector((state) => state.users.isLoading);
  // const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  //const [genderFilter, setGenderFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // const handleChangeGenderFilter = (e) => {
  //   setGenderFilter(e.target.value);
  //   setCurrentPage(1);
  // };

  const handleClearFilters = () => {
    setSearchTerm("");
    // setGenderFilter('all');
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const filteredUsers = users.filter((user) => {
    const name = user.name.toLowerCase();
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    return name.includes(searchTermLower) || username.includes(searchTermLower);
  });

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const RenderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
        </tr>
      </thead>
    );
  };

  const RenderTableBody = () => {
    return (
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.website}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  const RenderPagination = () => {
    const pageNumbers = Math.ceil(filteredUsers.length / usersPerPage);
    const paginationItems = [];

    for (let i = 1; i <= pageNumbers; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return <ul className="pagination">Page: {paginationItems}</ul>;
  };

  return (
    <div className="App">
      <div className="input">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
      <table className="table">
        <RenderTableHeader />

        <RenderTableBody />
      </table>
      <div className="page">
        <RenderPagination />
      </div>
    </div>
  );
}

export default App;
