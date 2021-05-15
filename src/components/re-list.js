import React, { useState, useEffect } from 'react';
import ListItem from './list-item';
import BeatLoader from "react-spinners/BeatLoader";
import FadeIn from 'react-fade-in';
import { css } from "@emotion/react";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
display: flex;
align-content: center;
justify-content: center;
  margin: 0 auto;
  border-color: red;
  margin-bottom:25px;
`;


const REList = ({ isLoading, listData, linkAddress, hideOnEmpty }) => {
    const [confg, setConfg] = useState({})

    useEffect(() => {
        fetch('/API/configurations/active/')
            .then(result => result.json())
            .then(result => setConfg(result))
    }, [])

    return (
        <div style={hideOnEmpty ? { display: listData.length === 0 && !isLoading ? 'none' : 'block' } : {}}>
            <div id="loading-container" className={!isLoading ? "h-none" : ""}>
                <BeatLoader color={confg.main_color ? confg.main_color : '#6464E6'} css={override} loading={true} size={25} />
            </div>
            {
                listData.length === 0 && !isLoading &&
                <div className="no-results-container">
                    <img src={require('../assets/images/no-results.gif').default} />
                    <h2>لم نعثر على اي نتائج</h2>
                </div>
            }
            <FadeIn>
                {listData.map((item, index) => {
                    return (
                        <ListItem
                            id={item.id}
                            key={index.toString()}
                            image={item.images.length > 0 ? item.images[0].src : ""}
                            title={item.title}
                            floor={item.floor}
                            numOfBathrooms={item.num_of_bathrooms}
                            numOfRooms={item.num_of_rooms}
                            area={item.area}
                            price={item.price}
                            description={item.description}
                            region={item.region}
                            landType={item.land_type}
                            offerType={item.offer_type}
                            linkAddress={linkAddress}
                            containsSwimmingPool={item.contains_swimming_pool}
                        />
                    )
                })}
            </FadeIn>
        </div>
    )
}

export default REList;