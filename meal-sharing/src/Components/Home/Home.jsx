import React from 'react';
import './Home.css';

const HomePage = () => {
    return (

        <div>
            <img src="/HomePage.jpeg" alt="Food" />
            <h1>Welcome to our meals</h1>
            <a href="/meals">
                <button>View All Meals</button>
            </a>
        </div>
    );
};

export default HomePage;
