import React from 'react';
import { Link } from "react-router-dom";
import NoImage from '../assets/images/no-image.jpg';

function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
        return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + ' ...'
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ListItem = ({ title, region, numOfRooms, numOfBathrooms, floor, area, image, price, description, id, containsSwimmingPool, landType, offerType, linkAddress }) => {
    console.log('landType', landType);
    return (
        <Link to={linkAddress + id}>
            <div className="list-item">
                <div className="list-item-image-container">
                    <div className="list-item-image" style={{ backgroundImage: image ? `url(` + image + `)` : `url(` + NoImage + `)` }}></div>
                    {
                        price && (
                            <div className="price">
                                <span>{numberWithCommas(price)} د.أ</span>
                            </div>
                        )
                    }

                </div>
                <div className="list-item-info">
                    <div className="list-item-title">
                        <h2>{title}</h2>
                        <span className="offer-type">{offerType == "for-sale" ? "للبيع" : offerType == "for-rent" ? "للإجار" : "خلو"}</span>
                    </div>
                    <div className="list-item-attributes">
                        {
                            numOfRooms ?
                                <div>
                                    <i className="fas fa-door-closed"></i>
                                    <span>{numOfRooms} غرف</span>
                                </div>
                                :
                                ""
                        }
                        {
                            numOfBathrooms ?
                                <div>
                                    <i className="fas fa-bath"></i>
                                    <span>{numOfBathrooms} حمام</span>
                                </div>
                                :
                                ""
                        }
                        {
                            area ?
                                <div>
                                    <i className="fas fa-ruler"></i>
                                    <span>{area} م2</span>
                                </div>
                                :
                                ""
                        }
                        {
                            containsSwimmingPool &&
                            <div>
                                <i class="fas fa-swimming-pool"></i>
                                <span>{containsSwimmingPool}مسبح</span>
                            </div>
                        }
                        {
                            landType &&
                            (
                                landType == "agricultural" ?
                                    <div>
                                        <i class="fas fa-tractor"></i>
                                        <span>أرض زراعية</span>
                                    </div>
                                    :
                                    <div>
                                        <i class="fas fa-building"></i>
                                        <span>أرض بنائية</span>
                                    </div>
                            )

                        }
                    </div>
                    {description ?
                        <p>{truncateString(description, 120)}</p>
                        : ""
                    }
                    {
                        region ?
                            <div className="item-address">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{region.name}</span>
                            </div>
                            : ""
                    }
                </div>
            </div>
        </Link>
    )
}

export default ListItem;