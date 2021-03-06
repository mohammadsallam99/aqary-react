import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/main-container';
import { useParams } from 'react-router-dom';
import REList from '../../components/re-list';

function Houses(props) {
    const { id } = useParams();

    const [apartments, setApartments] = useState([])
    const [governorates, setGovernorates] = useState([])
    const [regions, setRegions] = useState([])
    const [numOfBathrooms, setNumOfBathrooms] = useState('')
    const [numOfRooms, setNumOfRooms] = useState('')
    const [offerType, setOfferType] = useState('')

    const [regionValue, setRegionValue] = useState('')
    const [governorateValue, setGovernorateValue] = useState('')
    const [priceMinValue, setPriceMinValue] = useState('')
    const [priceMaxValue, setPriceMaxValue] = useState('')
    const [areaMaxValue, setAreaMaxValue] = useState('')
    const [areaMinValue, setAreaMinValue] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        importApartments();
        importGovernorates();
    }, [])

    const importApartments = async () => {
        setIsLoading(true);
        await fetch('/API/apartments/')
            .then(result => result.json())
            .then(result => {
                setApartments(result);
            })
            .finally(() => setTimeout(() => setIsLoading(false), 500))
    }

    const importGovernorates = async (governorateID) => {
        await fetch('/API/governorates/')
            .then(result => result.json())
            .then(result => {
                setGovernorates(result);
            })
    }

    const importRegions = async (governorateID) => {
        await fetch('/API/regions/?governorate=' + governorateID)
            .then(result => result.json())
            .then(result => {
                setRegions(result);
            })
    }

    const filter = async () => {
        setIsLoading(true);
        const api_key = '/API/apartments/?' + (regionValue ? 'region__id=' + regionValue : governorateValue ? 'region__governorate__id=' + governorateValue : "")
            + (priceMaxValue !== '' && priceMinValue !== '' ? '&price__range=' + priceMinValue + ',' + priceMaxValue
                : priceMinValue ? '&price__range=' + priceMinValue + ',999999999' : priceMaxValue ? '&price__range=0,' + priceMaxValue : "") +
            (areaMaxValue !== '' && areaMinValue !== '' ? '&area__range=' + areaMinValue + ',' + areaMaxValue
                : areaMinValue ? '&area__range=' + areaMinValue + ',999999999' : areaMaxValue ? '&area__range=0,' + areaMaxValue : "") +
            (numOfRooms ? "&num_of_rooms=" + numOfRooms : "") + (numOfBathrooms ? "&num_of_bathrooms=" + numOfBathrooms : "") +
            (offerType ? "&offer_type=" + offerType : "")
        console.log(api_key);
        await fetch(api_key)
            .then(r => r.json())
            .then(r => setApartments(r))
            .finally(() => setTimeout(() => setIsLoading(false), 500))
    }

    const reset = () => {
        // reset values of state..
        setRegionValue('');
        setGovernorateValue('');
        setAreaMaxValue('');
        setAreaMinValue('');
        setPriceMaxValue('');
        setPriceMinValue('');
        setNumOfRooms('');
        setNumOfBathrooms('');
        setOfferType('');

        // reimport items
        importApartments();
    }

    return (
        <div>
            <MainContainer>
                <div className="row">
                    <div className="col-md-8 content">
                        <REList
                            listData={apartments}
                            isLoading={isLoading}
                            linkAddress="/category/apartments/"
                        />
                    </div>
                    <div id="sidebar" className="col-md-4 sidebar">
                        <div className="sidebar-inner sidebar__inner">
                            <div className="inputs-group">
                                <label>?????? ??????????:</label>
                                <select className="form-control" value={offerType} onChange={({ target }) => { setOfferType(target.value) }}>
                                    <option value="">???? ??????</option>
                                    <option value="for-sale">??????????</option>
                                    <option value="for-rent">????????????</option>
                                    <option value="emptiness">??????</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>????????????????:</label>
                                <select className="form-control" value={governorateValue} onChange={({ target }) => { importRegions(target.value); setGovernorateValue(target.value); setRegionValue('') }}>
                                    <option value="">???? ??????</option>
                                    {
                                        governorates.map((item, index) => <option key={index.toString()} value={item.id}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>??????????????:</label>
                                <select className="form-control" value={regionValue} onChange={({ target }) => { setRegionValue(target.value) }}>
                                    <option value="">???? ??????</option>
                                    {
                                        regions.map((item, index) => <option key={index.toString()} value={item.id}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>??????????:</label>
                                <div className="input-line">
                                    <input type="number" min="0" value={priceMinValue} className="form-control"
                                        onChange={({ target }) => setPriceMinValue(target.value)}
                                        placeholder="????" />
                                    <input type="number" min="0" value={priceMaxValue} className="form-control"
                                        onChange={({ target }) => setPriceMaxValue(target.value)}
                                        placeholder="??????" />
                                </div>
                            </div>
                            <div className="inputs-group">
                                <label>??????????????:</label>
                                <div className="input-line">
                                    <input type="number" min="0" value={areaMinValue} className="form-control"
                                        onChange={({ target }) => setAreaMinValue(target.value)}
                                        placeholder="????" />
                                    <input type="number" value={areaMaxValue} min="0" className="form-control"
                                        onChange={({ target }) => setAreaMaxValue(target.value)}
                                        placeholder="??????" />
                                </div>
                            </div>
                            <div className="inputs-group">
                                <label>?????? ??????????:</label>
                                <select className="form-control" value={numOfRooms} onChange={({ target }) => { setNumOfRooms(target.value) }}>
                                    <option value="">???? ??????</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>?????? ????????????????:</label>
                                <select className="form-control" value={numOfBathrooms} onChange={({ target }) => { setNumOfBathrooms(target.value) }}>
                                    <option value="">???? ??????</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <button onClick={() => filter()} className="btn-primary btn submit-btn">??????</button>
                            <button onClick={() => reset()} className="btn btn-danger reset-btn">??????????</button>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    );
}

export default Houses
