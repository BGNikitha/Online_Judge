import React, { useState } from 'react';
import NavBar from './Navbar/Navbar';
import ProblemList from './ProblemList/ProblemList';

import styles from './ProblemPage.module.css';

const ProblemPage = () => {
  const [selectedOption, setSelectedOption] = useState('problemList');

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <NavBar setSelectedOption={setSelectedOption} />
      </div>
      <div className={styles.content}>
        {selectedOption === 'problemList' && <ProblemList />}
        
      </div>
    </div>
  );
};

export default ProblemPage;
