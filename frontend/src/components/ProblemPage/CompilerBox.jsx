import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './CompilerBox.module.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const CompilerBox = (props) => {
    const navigate = useNavigate();
    const problemId = props.problemId;
    const code = props.code;

    const [inputBox, setInputBox] = useState(true);
    const [outputBox, setOutputBox] = useState(false);
    const [verdictBox, setVerdictBox] = useState(false);
    const [activeButton, setActiveButton] = useState("input");

    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [correct, setCorrect] = useState("");
    const [total, setTotal] = useState("");
    const [verdict, setVerdict] = useState("");

    const handleInputBox = () => {
        setInputBox(true);
        setOutputBox(false);
        setVerdictBox(false);
        setActiveButton("input");
    };

    const handleOutputBox = () => {
        setInputBox(false);
        setOutputBox(true);
        setVerdictBox(false);
        setActiveButton("output");
    };

    const handleVerdictBox = () => {
        setInputBox(false);
        setOutputBox(false);
        setVerdictBox(true);
        setActiveButton("verdict");
    };

    const runCode = async () => {
        console.log(input);
        console.log(code);
        const sendData = { language: "cpp", code, input };

        try {
            const req = await axios.post(`${SERVER_URL}/compiler/run`, sendData, { withCredentials: true });
            setOutput(req.data);
            handleOutputBox();
        } catch (error) {
            console.error('Error in runCode:', error);
            if (error.response && error.response.data === "TLE") {
                setOutput("Time Limit Exceeded");
            } else {
                setOutput(error.response ? error.response.data : "Unknown Error");
            }
            handleOutputBox();
        }
    };

    const submitCode = async () => {
        console.log("code : ", code);
        const tempData = { language: "cpp", code };

        try {
            const req = await axios.post(`${SERVER_URL}/compiler/submit/${problemId}`, tempData, { withCredentials: true });
            console.log(req.data);
            setCorrect(req.data.correct);
            setTotal(req.data.total);
            setVerdict(req.data.verdict);
            handleVerdictBox();

            const submissionData = {
                userId: req.data.userId, // Assuming userId is returned in req.data from server
                problem: problemId,
                verdict: req.data.verdict,
                language: "cpp", // You may want to pass language dynamically
                submitted_at: new Date(),
            };

            await axios.post(`${SERVER_URL}/submission`, submissionData, { withCredentials: true });
            console.log("Submission saved to MongoDB:", submissionData);
        } catch (error) {
            console.error('Error in submitCode:', error);
            if (error.response) {
                if (error.response.status === 401) {
                    console.log("User is not logged in");
                    alert("You have to login to submit the code");
                    navigate('/Login');
                } else if (error.response.status === 500) {
                    console.log(error.response.data);
                    setOutput(error.response.data);
                    handleOutputBox();
                } else {
                    console.log(error.response.status);
                    console.log(error.response.data);
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };

    return (
        <div className={styles.compilerBox}>
            <div className={styles.toolbar}>
                <div className={`${styles.button} ${activeButton === 'input' && styles.activeButton}`} onClick={handleInputBox}>Input</div>
                <div className={`${styles.button} ${activeButton === 'output' && styles.activeButton}`} onClick={handleOutputBox}>Output</div>
                <div className={`${styles.button} ${activeButton === 'verdict' && styles.activeButton}`} onClick={handleVerdictBox}>Verdict</div>
            </div>

            <div className={styles.textAreaContainer}>
                {inputBox && (
                    <textarea
                        className={styles.textArea}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                )}

                {outputBox && (
                    <textarea
                        className={styles.textArea}
                        value={output}
                        readOnly={true}
                    />
                )}

                {verdictBox && (
                    <div className={styles.mdt}>
                        {verdict === "ACCEPTED" && <div className={styles.accepted}>ACCEPTED</div>}
                        {verdict === "REJECTED" && <div className={styles.rejected}>REJECTED</div>}
                        {verdict === "TLE" && <div className={styles.wa}>Time Limit Exceeded</div>}
                        {verdict === "Error" && <div className={styles.wa}>Error</div>}
                       
                    </div>
                )}
            </div>

            <div className={styles.buttonContainer}>
                <button className={styles.runButton} onClick={runCode}>Run</button>
                <button className={styles.submitButton} onClick={submitCode}>Submit</button>
            </div>
        </div>
    );
};

export default CompilerBox;
