import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Admin.module.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Admin = () => {
    const [problemList, setProblemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/admin`, { withCredentials: true });
            console.log('Fetched data:', response.data); // Debugging
            setProblemList(response.data); // Assuming response.data is an array of problems
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProblem = async (problemId) => {
        const confirmation = window.confirm("Are you sure you want to permanently delete this problem?");
        if (confirmation) {
            try {
                await axios.delete(`${SERVER_URL}/admin/delete/${problemId}`, { withCredentials: true });
                fetchData();
            } catch (error) {
                console.error('Error deleting problem:', error);
                setError('Error deleting problem');
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.createLinkContainer}>
                <Link to={`/admin/create`} className={styles.createLink}>Create New Problem</Link>
            </div>
            <ol className={styles.problemList}>
                {problemList.length === 0 ? (
                    <div>No problems found.</div>
                ) : (
                    problemList.map((problem, index) => (
                        <li key={index} className={styles.problemItem}>
                            <div className={styles.problemTitle}>{problem.name}</div>
                            <div className={styles.problemActions}>
                                <div onClick={() => deleteProblem(problem._id)} className={`${styles.actionButton} ${styles.deleteButton}`}>Delete</div>
                                <Link to={`/problem/${problem._id}`} className={`${styles.actionButton} ${styles.readButton}`}>Read</Link>
                                <Link to={`/admin/edit/${problem._id}`} className={`${styles.actionButton} ${styles.editButton}`}>Edit</Link>
                            </div>
                        </li>
                    ))
                )}
            </ol>
        </div>
    );
};

export default Admin;
