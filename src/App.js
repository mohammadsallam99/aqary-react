import CategoryBox from './components/category-box';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Houses from './pages/houses/houses';
import MainContainer from './components/main-container';
import Lands from './pages/lands/lands';
import DetailsView from './pages/details-view';
import Mansions from './pages/mansions/mansions';
import Stores from './pages/stores/stores';
import StorageUnits from './pages/storage-unit/storage-units';
import { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';
import ContactUs from './pages/contact-us/contact-us';
import REList from './components/re-list';
import Others from './pages/others/others';
import Calculator from './pages/calculator/calculator';

function About() {
  return (
    <MainContainer>
      <h2>عن عقاري</h2>
      <p>
        وريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
        أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
        أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس
        أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت
        نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا
        كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم.
      </p>
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D8%A9%20%D8%A7%D9%84%D8%A7%D8%B1%D8%AF%D9%86%D9%8A%D8%A9&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
      </div>
    </MainContainer>
  );
}

function Homepage({ title }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState({});


  const categories = [
    {
      title: 'شقق',
      image: require('./assets/images/apartments.jpg').default,
      link: '/category/apartments',
      icon: 'flaticon-duplex-house'
    },
    {
      title: 'فلل /قصور /شاليهات',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
      icon: 'flaticon-big-castle',
      link: '/category/mansions'
    },
    {
      title: 'محلات تجارية',
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80',
      icon: 'flaticon-street-shop',
      link: '/category/stores'
    },
    {
      title: 'مخازن',
      image: 'https://images.unsplash.com/photo-1551313158-73d016a829ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1322&q=80',
      icon: 'flaticon-closed-garage',
      link: '/category/storage-units'
    },
    {
      title: 'مزارع/أراضي',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80',
      icon: 'flaticon-small-wind-mill',
      link: '/category/lands'
    },
    {
      title: 'عقارات أخرى',
      image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      icon: 'flaticon-industrial-zone',
      link: '/category/others'
    },
  ]

  const search = async () => {
    if (searchValue.trim().length > 0)
      await fetch('/API/search?title=' + searchValue)
        .then(r => r.json())
        .then(r => {
          console.log(Object.values(r));
          setSearchResults(r);
        })
  }

  useEffect(() => {
    search();
  }, [searchValue])

  let merged = [].concat.apply([], Object.values(searchResults));


  return (
    <div>
      <MainContainer>

        <div className="homepage-header" style={{ backgroundImage: "url(/assets/images/home-bg.png)" }}>
          <div className="background-color-layer" />

          <div className="homepage-header-inner">
            <div className="homepage-header-talk">
              <h1>أهلاً بك في {title ? title : 'عقاري'}</h1>
              <span>هل تبحث عن عقار؟ سوف تجده على موقعنا.</span>
            </div>
            <div className="homepage-search">
              <input type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="ابحث هنا .. " />
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
        <div>
          {
            searchResults['apartments'] !== undefined && merged.length === 0 && searchValue.trim().length > 0 &&
            < div className="no-results-container">
              <img src={require('./assets/images/no-results.gif').default} />
              <h2>لم نعثر على اي نتائج</h2>
            </div>
          }
          {
            searchValue.trim().length > 0 && searchResults['apartments'] !== undefined &&
            <REList
              hideOnEmpty
              listData={searchResults['apartments']}
              linkAddress="/category/apartments/"
            />
          }
          {
            searchValue.trim().length > 0 && searchResults['mansions'] !== undefined &&
            <REList
              hideOnEmpty
              listData={searchResults['mansions']}
              linkAddress="/category/mansions/"
            />
          }
          {
            searchValue.trim().length > 0 && searchResults['lands'] !== undefined &&
            <REList
              hideOnEmpty
              listData={searchResults['lands']}
              linkAddress="/category/lands/"
            />
          }
          {
            searchValue.trim().length > 0 && searchResults['storage_units'] !== undefined &&
            <REList
              hideOnEmpty
              listData={searchResults['storage_units']}
              linkAddress="/category/storage-units/"
            />
          }
          {
            searchValue.trim().length > 0 && searchResults['stores'] !== undefined &&
            <REList
              hideOnEmpty
              listData={searchResults['stores']}
              linkAddress="/category/stores/"
            />
          }
        </div>
        <div className="categories-container row">
          {
            categories.map((item, index) => (
              <CategoryBox
                key={index.toString()}
                image={item.image}
                title={item.title}
                link={item.link}
                icon={item.icon}
              />
            ))
          }
        </div>
      </MainContainer>
    </div >
  );
}

const App = () => {

  const [confg, setConfg] = useState({})

  useEffect(() => {
    fetch('/API/configurations/active/')
      .then(result => result.json())
      .then(result => setConfg(result))
  }, [])

  const GlobalStyles = createGlobalStyle`
  :root {
    --main-color: ${confg.main_color ? confg.main_color : "#6464E6"};
    --background-image: url("${confg.background_image ? confg.background_image : ""}")
  }
  `;

  return (
    <Router>

      <GlobalStyles />

      <div>
        <div className="container navbar-container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">{confg.website_title ? confg.website_title : 'عقاري'}</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/"> <i className="fas fa-home"></i>الصفحة الرئيسية</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about"><i className="fas fa-info-circle"></i>عن {confg.website_title ? confg.website_title : 'عقاري'}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact-us"><i class="fas fa-envelope"></i>تواصل معنا</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/calculator"><i class="fas fa-calculator"></i>المخمن العقاري</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" to="/category/#" onClick={() => { }} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">عقارات</a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <NavLink className="dropdown-item" to="/category/apartments" params={{ id: 5 }}>شقق</NavLink>
                    <NavLink className="dropdown-item" to="/category/mansions" params={{ id: 5 }}>فلل /قصور /شاليهات</NavLink>
                    <NavLink className="dropdown-item" to="/category/lands" params={{ id: 5 }}>اراضي/مزارع</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="/category/stores" params={{ id: 5 }}>محلات تجارية</NavLink>
                    <NavLink className="dropdown-item" to="/category/storage-units" params={{ id: 5 }}>مخازن</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="/category/others" params={{ id: 5 }}>عقارات اخرى</NavLink>
                  </div>
                </li>
              </ul>
              <div className="navbar-nav" style={{ marginRight: 'auto' }}>
                {
                  confg.instagram_link &&
                  <li className="nav-item">
                    <a target="_blank" className="nav-link social-link" href={confg.instagram_link}><i className="fab fa-instagram-square"></i></a>
                  </li>
                }
                {
                  confg.twitter_link &&
                  <li className="nav-item">
                    <a target="_blank" className="nav-link social-link" href={confg.twitter_link}><i className="fab fa-twitter-square"></i></a>
                  </li>
                }
                {
                  confg.facebook_link &&
                  <li className="nav-item">
                    <a target="_blank" className="nav-link social-link" href={confg.facebook_link}><i className="fab fa-facebook-square"></i></a>
                  </li>
                }
              </div>
            </div>
          </nav>
        </div>

        <Switch>
          <Route exact path="/">
            <Homepage title={confg.website_title ? confg.website_title : 'عقاري'} />
          </Route>
          <Route path="/home">
            <Homepage />
          </Route>
          <Route path="/contact-us">
            <ContactUs />
          </Route>
          <Route path="/about">
            <About />
          </Route>

          <Route exact path="/category/lands">
            <Lands />
          </Route>
          <Route path="/category/lands/:id">
            <DetailsView apiName="lands" />
          </Route>

          <Route exact path="/category/others">
            <Others />
          </Route>
          <Route path="/category/others/:id">
            <DetailsView apiName="others" />
          </Route>

          <Route exact path="/category/mansions">
            <Mansions />
          </Route>
          <Route path="/category/mansions/:id">
            <DetailsView apiName="mansions" />
          </Route>

          <Route exact path="/category/stores">
            <Stores />
          </Route>
          <Route path="/category/stores/:id">
            <DetailsView apiName="stores" />
          </Route>

          <Route exact path="/category/storage-units">
            <StorageUnits />
          </Route>
          <Route path="/category/storage-units/:id">
            <DetailsView apiName="storage-unit" />
          </Route>

          <Route exact path="/category/apartments">
            <Houses />
          </Route>
          <Route path="/category/apartments/:id">
            <DetailsView apiName="apartments" />
          </Route>

          <Route exact path="/calculator">
            <Calculator />
          </Route>

        </Switch>
      </div>

    </Router>
  );
}

export default App;
