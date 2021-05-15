import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/main-container';
import { useParams } from 'react-router-dom';
import { css } from "@emotion/react";

const override = css`
display: flex;
align-content: center;
justify-content: center;
  margin: 0 auto;
  border-color: red;
  margin-bottom:25px
`;

function Calculator(props) {
    const { id } = useParams();

    const [numOfBathrooms, setNumOfBathrooms] = useState('')
    const [numOfRooms, setNumOfRooms] = useState('')
    const [balcony, setBalcony] = useState('')
    const [howFarFromServices, setHowFarFromServices] = useState('')
    const [deluxe, setDeluxe] = useState('')

    const [governorates, setGovernorates] = useState([])
    const [regions, setRegions] = useState([])

    const [regionValue, setRegionValue] = useState('')
    const [governorateValue, setGovernorateValue] = useState('')
    const [area, setArea] = useState('')

    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false)

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        importGovernorates();
    }, [])

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

    const calculate = async () => {
        let total = 0;
        let selected_region = regions.find(item => item.id == regionValue);

        if (selected_region) {
            if (selected_region.starting_price)
                total += selected_region.starting_price;
            else
                total += 15000;
        }

        //number of rooms:
        if (numOfRooms)
            total += parseInt(numOfRooms);

        //number of bathrooms:
        if (numOfBathrooms)
            total += parseInt(numOfBathrooms);

        //balcony
        if (balcony)
            total += parseInt(balcony);

        //howFarFromServices:
        if (howFarFromServices)
            total += parseInt(howFarFromServices);

        //Deluxe
        if (deluxe)
            total += parseInt(deluxe);

        setTotal(total)
    }

    const reset = () => {
        // reset values of state..
        setRegionValue('');
        setGovernorateValue('');
        setArea('');
        setDeluxe('');
        setHowFarFromServices('');
        setNumOfBathrooms('');
        setNumOfRooms('');
        setBalcony('');
    }

    return (
        <div >
            <MainContainer>
                <div className="row">
                    <div id="sidebar" className="col-md-12 sidebar">
                        <div className="sidebar-inner sidebar__inner">
                            <div className="calculator-header">
                                <span>السعر المخمن</span>
                                <h1 id="calculated-price">{total}$</h1>
                            </div>
                            <hr />
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
                                        regions.map((item, index) => <option key={index.toString()} value={item.id}>{item.name}{item.starting_price ? " - تبدأ من " + numberWithCommas(item.starting_price) : ''}</option>)
                                    }
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>المساحة:</label>
                                <select className="form-control" value={area} onChange={({ target }) => { setArea(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value={5000}>50م - 150م</option>
                                    <option value={10000}>150م - 300م</option>
                                    <option value={15000}>300+م</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>عدد الغرف:</label>
                                <select className="form-control" value={numOfRooms} onChange={({ target }) => { setNumOfRooms(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value={4000}>2</option>
                                    <option value={5000}>3</option>
                                    <option value={7000}>4</option>
                                    <option value={9000}>5</option>
                                    <option value={10000}>6</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>عدد الحمامات:</label>
                                <select className="form-control" value={numOfBathrooms} onChange={({ target }) => { setNumOfBathrooms(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value={0}>2</option>
                                    <option value={1500}>3</option>
                                    <option value={3000}>4</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>بلكونة:</label>
                                <select className="form-control" value={balcony} onChange={({ target }) => { setBalcony(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value={1000}>مع</option>
                                    <option value={-1000}>بدون</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>بعد العقار عن الخدمات:</label>
                                <select className="form-control" value={howFarFromServices} onChange={({ target }) => { setHowFarFromServices(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value={3000}>0م - 50م</option>
                                    <option value={1500}>50م - 150م</option>
                                    <option value={500}>150م - 300م</option>
                                    <option value={-1000}>300+م</option>
                                </select>
                            </div>
                            <div className="inputs-group">
                                <label>نوع التشطيب:</label>
                                <select className="form-control" value={setDeluxe} onChange={({ target }) => { setDeluxe(target.value) }}>
                                    <option value="">لا شيء</option>
                                    <option value={10000}>ديلوكس</option>
                                    <option value={0}>عادي</option>
                                </select>
                            </div>
                            <button onClick={() => calculate()} className="btn-primary btn submit-btn">تخمين</button>
                            <button onClick={() => reset()} className="btn btn-danger reset-btn">اعادة</button>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    );
}

export default Calculator