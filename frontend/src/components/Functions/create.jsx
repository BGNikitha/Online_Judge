import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import styles from './create.module.css' ;
import { useNavigate  } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL

export default function Create( ){

    const [name, setname] = useState('');
    const [statement, setstatement] = useState('');
    const [SampleInput, setSampleInput] = useState('');
    const [SampleOutput, setSampleOutput] = useState('');
    const [testCases, setTestCases] = useState([]);
    const [input , setInput] = useState("") ;   
    const [output , setOutput] = useState("") ;
    
    const navigate = useNavigate() ;


    function add_TestCase(){

        if( input.trim() !== "" && output.trim() !== "" ){
            setTestCases( (prev) => [...prev , {input , output} ]) ;
            setInput("") ;
            setOutput("") ;
        }
        else{
            alert(' please fill both input and ouput of Test Case ');
        }
    }
    function delete_TestCase(index){

        const newTestCase = testCases.filter( (Element , i) => i !== index ) ;
        setTestCases(newTestCase) ;

    }

    const submitProblem = async () => {

        if( name.trim() === "" || statement.trim() === "" || SampleInput.trim() ===  ""  || SampleOutput.trim() === "" ){
            alert( "please fill all the Details " )
        }
        else{
            try{

                // console.log(testCases) 
                const dataToSend = { name , statement , SampleInput ,SampleOutput , testCases } ;
                // console.log("sending request") ;
                const res = await axios.post( `${SERVER_URL}/admin/create` , dataToSend , {withCredentials:true}  ) ;
                // console.log("success" , res.data) ;
                alert('Problem created successfully');
                navigate("/admin") ;

            }
            catch(error){
                if( error.response.status === 496 ){
                    alert(" you are not Admin ") ;
                }
                console.log(" error while sending data " , error ) ;
            }
        }
    }


    return( 
        <div className={styles.container}>
                {/* Use className from CSS module */}
                <h1>Create a Problem</h1>
                <div>
                    <div className={styles['form-group']}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                    />
                    </div>
                    <div className={styles['form-group']}>
                    <label htmlFor="description">Statement:</label>
                    <textarea
                        id="description"
                        value={statement}
                        onChange={(e) => setstatement(e.target.value)}
                        required
                    ></textarea>
                    </div>
                    <div className={styles['form-group']}>
                    <label htmlFor="SampleInput">Sample Input:</label>
                    <textarea
                        id="SampleInput"
                        value={SampleInput}
                        onChange={(e) => setSampleInput(e.target.value)}
                        required
                    />
                    </div>
                    <div className={styles['form-group']}>
                    <label htmlFor="SampleOutput">Sample Output:</label>
                    <textarea
                        id="SampleOutput"
                        value={SampleOutput}
                        onChange={(e) => setSampleOutput(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.testCaseContainer}>
                    <h1>Add Test Case</h1>
                    <div className={styles.testCaseForm}>
                    <div className={styles.testCaseForm1}>
                        <label className={styles.testCaseFormDiv}>Input</label>
                        <textarea
                        id="testcaseInput"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                        className={styles.testCaseFormTextarea}
                        />
                    </div>

                    <div className={styles.testCaseForm1}>
                        <label className={styles.testCaseFormDiv}>Output</label>
                        <textarea
                        id="testcaseOutput"
                        value={output}
                        onChange={(e) => setOutput(e.target.value)}
                        required
                        className={styles.testCaseFormTextarea}
                        />
                    </div>
                    <div >
                        <div className={styles.addButton} onClick={add_TestCase}>Add</div>
                    </div>
                    </div>
                    <ol className={styles.testCaseList}>
                    {testCases.map((value, key) => (
                        <li key={key} className={styles.testCaseListLi}>
                        <div className={styles.testCaseListLiC}>{value.input}</div>
                        <div className={styles.testCaseListLiC}>{value.output}</div>
                        <div className={styles.deleteButton} onClick={() => delete_TestCase(key)}>
                            Delete
                        </div>
                        </li>
                    ))}
                    </ol>
                </div>
                
                <div className={styles.formSubitContainer}>
                    <div className={styles.formSubmit} onClick={submitProblem} >
                        Submit Problem
                    </div>
                </div>
                


        </div>

 
        </div>

    );

};