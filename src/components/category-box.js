import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link
} from "react-router-dom";
import '../assets/fonts/building-icons-font/flaticon.css';

const CategoryBox = ({ image, title, link, icon }) => {
    return (
        <div className="col-sm-4 col-12" >
            <Link to={link ? link : '#'}>
                <div className="category-box-container">
                    <div className="image-container">
                        <img src={image} />
                        <div className="icon-container">
                            <i className={icon}></i>
                        </div>
                    </div>
                    <span>{title}</span>
                </div>
            </Link>
        </div>
    )
}

export default CategoryBox;
