import React from 'react';
import Usa from './usa';
import styles from "../../styles/moduleCss/home.module.css";
import Canada from './canada';
import Europe from './europe';
import Australia from './australia';
import Latin from './latin';

const Index = () => {
    return (
        <div  className={styles.container}>
            <Usa />
            <Canada />
            <Europe />
            <Australia />
            <Latin />
        </div>
    );
};

export default Index;