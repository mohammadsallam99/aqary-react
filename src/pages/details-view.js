import React, { useEffect, useState } from 'react';
import MainContainer from '../components/main-container';
import { useParams } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import ReactBnbGallery from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';

function DetailsView({ apiName }) {
    const { id } = useParams();

    const [detailsObject, setDetailsObject] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [focusedImageIndex, setFocusedImageIndex] = useState(0);

    const importDetails = async () => {
        await fetch('/API/' + apiName + '/' + id + '/')
            .then(r => r.json())
            .then(r => {
                setDetailsObject(r);
            })
    }

    useEffect(() => {
        importDetails();
    }, [])


    let image_components = [], images_links = [];

    if (detailsObject.images) {
        images_links = detailsObject.images.map((item) => item.src);

        image_components = images_links.map((item, index) => {
            return (
                <div onClickCapture={() => {
                    setFocusedImageIndex(index);
                    setIsOpen(true);
                }} className="detail-slider-image" style={{
                    backgroundImage: `url(` + item + `)`
                }}></div>
            )
        });

    }

    return (
        <div>
            {
                images_links.length > 0 &&
                <div className="container carousel-container">
                    <div className="carousel-header">
                        <div className="carousel-header-title">
                            <i className="fas fa-camera"></i>
                            <span>مجموعة صور ل{detailsObject.title}</span>
                        </div>
                    </div>
                    <AliceCarousel
                        activeIndex={focusedImageIndex}
                        renderNextButton={({ isDisabled }) => <div
                            style={images_links.length <= 1 ? { display: 'none' } : {}}
                            className={isDisabled ? "disabled btn" : "btn"}>
                            <span>السابق</span>
                            <i className="fas fa-chevron-right"></i>
                        </div>}
                        renderPrevButton={({ isDisabled }) => <div
                            style={images_links.length <= 1 ? { display: 'none' } : {}}
                            className={isDisabled ? "disabled btn" : "btn"}>
                            <i className="fas fa-chevron-left"></i>
                            <span>التالي</span>
                        </div>}
                        items={image_components}
                    />
                </div>
            }

            <MainContainer>
                <div className="row ">

                    <div className="col-md-9 content">
                        <div>
                            <div className="list-item-image-container">
                                <div className="list-item-image" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)` }}></div>
                            </div>
                            <div className="list-item-info">
                                <h2>{detailsObject.title}</h2>
                                <div className="list-item-attributes">
                                    {
                                        detailsObject.region &&
                                        < div >
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>{detailsObject.region.name}</span>
                                        </div>
                                    }
                                    {
                                        detailsObject.num_of_rooms &&
                                        <div>
                                            <i className="fas fa-door-closed"></i>
                                            <span>{detailsObject.num_of_rooms} غرف</span>
                                        </div>
                                    }
                                    {
                                        detailsObject.num_of_bathrooms &&
                                        <div>
                                            <i className="fas fa-bath"></i>
                                            <span>{detailsObject.num_of_bathrooms} حمام</span>
                                        </div>
                                    }
                                    {
                                        detailsObject.area &&
                                        <div>
                                            <i className="fas fa-ruler"></i>
                                            <span>{detailsObject.area} م2</span>
                                        </div>
                                    }
                                </div>
                                {
                                    detailsObject.description &&
                                    <p>{detailsObject.description}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 sidebar">
                        <div></div>
                    </div>
                </div>
            </MainContainer>
            {
                detailsObject.images &&
                <ReactBnbGallery
                    activePhotoIndex={focusedImageIndex}
                    show={isOpen}
                    photos={detailsObject.images.map((item) => item.src)}
                    onClose={() => setIsOpen(false)}
                    nextButtonPressed={() => console.log('hi')}
                />
            }

        </div >
    );
}

export default DetailsView;