import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/main-container';
import { useParams } from 'react-router-dom';
import REList from '../../components/re-list';

function Mansions(props) {
    const { id } = useParams();

    const [mansions, setMansions] = useState([])
    const [governorates, setGovernorates] = useState([])
    const [regions, setRegions] = useState([])
    const [numOfBathrooms, setNumOfBathrooms] = useState('')
    const [numOfRooms, setNumOfRooms] = useState('')
    const [mansionType, setMansionType] = useState('')
    const [containsPool, setContainsPool] = useState('')
    const [numOfFloors, setNumOfFloors] = useState('')
    const [offerType, setOfferType] = useState('')

    const [regionValue, setRegionValue] = useState('')
    const [governorateValue, setGovernorateValue] = useState('')
    const [priceMinValue, setPriceMinValue] = useState('')
    const [priceMaxValue, setPriceMaxValue] = useState('')
    const [areaMaxValue, setAreaMaxValue] = useState('')
    const [areaMinValue, setAreaMinValue] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        importMansions();
        importGovernorates();
    }, [])

    const importMansions = async () => {
        setIsLoading(true);
        await fetch('/API/mansions/')
            .then(result => result.json())
            .then(result => {
                setMansions(result);
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
        const api_key = '/API/mansions/?' + (regionValue ? 'region__id=' + regionValue : governorateValue ? 'region__governorate__id=' + governorateValue : "")
            + (priceMaxValue !== '' && priceMinValue !== '' ? '&price__range=' + priceMinValue + ',' + priceMaxValue
                : priceMinValue ? '&price__range=' + priceMinValue + ',999999999' : priceMaxValue ? '&price__range=0,' + priceMaxValue : "") +
            (areaMaxValue !== '' && areaMinValue !== '' ? '&area__range=' + areaMinValue + ',' + areaMaxValue
                : areaMinValue ? '&area__range=' + areaMinValue + ',999999999' : areaMaxValue ? '&area__range=0,' + areaMaxValue : "") +
            (numOfRooms ? "&num_of_rooms=" + numOfRooms : "") + (numOfBathrooms ? "&num_of_bathrooms=" + numOfBathrooms : "") +
            (offerType ? "&offer_type=" + offerType : "") +
            (numOfFloors ? "&num_of_floors=" + setNumOfFloors : "") +
            (mansionType ? "&mansion_type=" + mansionType : "") +
            (containsPool ? "&contains_swimming_pool=" + containsPool : "")
        console.log(api_key);
        await fetch(api_key)
            .then(r => r.json())
            .then(r => setMansions(r))
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
        setNumOfFloors('');
        setMansionType('');
        setContainsPool('');

        // reimport items
        importMansions();
    }

    return (
        <div>
            <MainContainer>
                <div className="row ">
                    <div className="col-md-8 content">
                        <REList
                            listData={mansions}
                            isLoading={isLoading}
                            linkAddress="/category/mansions/"
                        />
                    </div>
                    <div id="sidebar" className="col-md-4 sidebar">
                        <div className="sidebar-inner sidebar__inner">
                            <div className="inputs-group">
                                <label>نوع العرض:</label>
                                <select className="form-control" value={offerType} onChange={({ target }) => { setOfferType(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value="for-sale">للبيع</option>
                                    <option value="for-rent">للإجار</option>
                                    <option value="emptiness">خلو</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>نوع العقار:</label>
                                <select className="form-control" value={mansionType} onChange={({ target }) => { setMansionType(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value="palace">قصر</option>
                                    <option value="villa">فيلا</option>
                                    <option value="chalet">شاليه</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>المحافظة:</label>
                                <select className="form-control" value={governorateValue} onChange={({ target }) => { importRegions(target.value); setGovernorateValue(target.value); setRegionValue('') }}>
                                    <option value="">لا شيء</option>
                                    {
                                        governorates.map((item, index) => <option key={index.toString()} value={item.id}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>المنطقة:</label>
                                <select className="form-control" value={regionValue} onChange={({ target }) => { setRegionValue(target.value) }}>
                                    <option value="">لا شيء</option>
                                    {
                                        regions.map((item, index) => <option key={index.toString()} value={item.id}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>السعر:</label>
                                <div className="input-line">
                                    <input type="number" min="0" value={priceMinValue} className="form-control"
                                        onChange={({ target }) => setPriceMinValue(target.value)}
                                        placeholder="من" />
                                    <input type="number" min="0" value={priceMaxValue} className="form-control"
                                        onChange={({ target }) => setPriceMaxValue(target.value)}
                                        placeholder="الى" />
                                </div>
                            </div>
                            <div className="inputs-group">
                                <label>المساحة:</label>
                                <div className="input-line">
                                    <input type="number" min="0" value={areaMinValue} className="form-control"
                                        onChange={({ target }) => setAreaMinValue(target.value)}
                                        placeholder="من" />
                                    <input type="number" value={areaMaxValue} min="0" className="form-control"
                                        onChange={({ target }) => setAreaMaxValue(target.value)}
                                        placeholder="الى" />
                                </div>
                            </div>
                            <div className="inputs-group">
                                <label>عدد الطوابق:</label>
                                <select className="form-control" value={numOfFloors} onChange={({ target }) => { setNumOfRooms(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>عدد الغرف:</label>
                                <select className="form-control" value={numOfRooms} onChange={({ target }) => { setNumOfRooms(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>عدد الحمامات:</label>
                                <select className="form-control" value={numOfBathrooms} onChange={({ target }) => { setNumOfBathrooms(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>مسبح:</label>
                                <select className="form-control" value={containsPool} onChange={({ target }) => { setContainsPool(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value="false">لا</option>
                                    <option value="true">نعم</option>
                                </select>
                            </div>
                            <button onClick={() => filter()} className="btn-primary btn submit-btn">بحث</button>
                            <button onClick={() => reset()} className="btn btn-danger reset-btn">اعادة</button>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    );
}

export default Mansions;