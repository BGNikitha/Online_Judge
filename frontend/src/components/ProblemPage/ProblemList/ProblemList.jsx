import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './ProblemList.module.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL; // Ensure the variable name matches your .env file

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/home`, { withCredentials: true });
        console.log("Listing problems:", response.data);

        // Ensure the response data is an array, if not convert it to an array
        const problemsData = Array.isArray(response.data) ? response.data : [response.data];
        setProblems(problemsData);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setProblems([]);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className={style.problemListContainer}>
      <h2>Problem List</h2>
      <div className={style.problemList}>
        {problems.map((problem, index) => (
          <div key={index} className={style.problemItem}>
            <Link to={`/problem/${problem._id}`} className={style.link}>
              {problem.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
