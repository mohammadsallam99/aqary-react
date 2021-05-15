import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/main-container';
import { useParams } from 'react-router-dom';
import REList from '../../components/re-list';

function Stores(props) {
    const { id } = useParams();

    const [stores, setStores] = useState([])
    const [governorates, setGovernorates] = useState([])
    const [regions, setRegions] = useState([])
    const [numOfDoors, setnumOfDoors] = useState('')
    const [offerType, setOfferType] = useState('')

    const [regionValue, setRegionValue] = useState('')
    const [governorateValue, setGovernorateValue] = useState('')
    const [priceMinValue, setPriceMinValue] = useState('')
    const [priceMaxValue, setPriceMaxValue] = useState('')
    const [areaMaxValue, setAreaMaxValue] = useState('')
    const [areaMinValue, setAreaMinValue] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        importStores();
        importGovernorates();
    }, [])

    const importStores = async () => {
        setIsLoading(true);
        await fetch('/API/stores/')
            .then(result => result.json())
            .then(result => {
                setStores(result);
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
        const api_key = '/API/stores/?' + (regionValue ? 'region__id=' + regionValue : governorateValue ? 'region__governorate__id=' + governorateValue : "")
            + (priceMaxValue !== '' && priceMinValue !== '' ? '&price__range=' + priceMinValue + ',' + priceMaxValue
                : priceMinValue ? '&price__range=' + priceMinValue + ',999999999' : priceMaxValue ? '&price__range=0,' + priceMaxValue : "") +
            (areaMaxValue !== '' && areaMinValue !== '' ? '&area__range=' + areaMinValue + ',' + areaMaxValue
                : areaMinValue ? '&area__range=' + areaMinValue + ',999999999' : areaMaxValue ? '&area__range=0,' + areaMaxValue : "") +
            (numOfDoors ? "&num_of_doors=" + numOfDoors : "") +
            (offerType ? "&offer_type=" + offerType : "")
        console.log(api_key);
        await fetch(api_key)
            .then(r => r.json())
            .then(r => setStores(r))
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
        setnumOfDoors('');
        setOfferType('');

        // reimport items
        importStores();
    }

    return (
        <div >
            {/* <SearchSection
                backgroundImage="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80"
            /> */}

            <MainContainer>
                <div className="row">
                    <div className="col-md-8 content">
                        <REList
                            listData={stores}
                            isLoading={isLoading}
                            linkAddress="/category/stores/"
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
                                <label>عدد الأبواب:</label>
                                <select className="form-control" value={numOfDoors} onChange={({ target }) => { setnumOfDoors(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
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

export default Stores