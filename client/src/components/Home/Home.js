import React from 'react';
import {Link} from "react-router-dom";
import homeBanner from '../../Assets/img/home.jpg'
const Home = () => {
    return (
        <>
            <section className="home">
                <div className="banner">
                    <img src={homeBanner} alt="home banner"/>
                </div>
                <div className="container">
                    <h1 className="title">Covid Helper</h1>
                    <p>This application is an assistant for tracking COVID19 and get Food Camps or near hospitals, Hope this would help you...</p>
                    <div className="btn-sec">
                        <Link to="/Statistics">View Latest Statistics</Link>
                        <Link to="/FoodCamps">View Nearby FoodCamps</Link>
                        <Link to="/Hospitals">View Nearby Hospitals</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;