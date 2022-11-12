import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getRestaurants, searchRestaurant, searchRestaurant2 } from '../../actions/restaurantActions'
import RestaurantItem from './restaurantItems'
import Preloader from '../layout/Preloader'
import { loadUser } from '../../actions/userActions'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Home = ({ restaurants, getRestaurants, searchRestaurant, searchRestaurant2 ,loadUser }) => {
    useEffect(() => {
        getRestaurants();
        if (localStorage.token) { loadUser() }
        // eslint-disable-next-line
    }, [])

    const [text, setText] = useState('')
    const [isSearch, setIsSearch] = useState(true)
    const [description, setDescription] = useState('buttery')
    const [avgCost, setAvgCost] = useState('10')

    const changeSearch = () => {
        let x = !isSearch;
        setIsSearch(!isSearch);
    }

    const onChange1 = (e) => {
        setText(e.target.value);
        console.log(text);
}

const onChange2 = (e) => {
    // e.preventDefault()
    console.log("hello", e)
    // console.log(e.target.value)
    setDescription(e.value);
    // console.log(text);
}

const onChange3 = (e) => {
    // e.preventDefault()

    setAvgCost(e.value);
    // console.log(text);
}


    const onSubmit1 = (e) => {
    console.log("hello")
        e.preventDefault();
        // if (text === "") {
        //     // alertContext.setAlert('Please enter something', 'light')
        // }
        // else {
        //     // githubContext.searchUsers(text);
        //     setText("");
        // }
        // await axios.post(`/api/restaurant/search/${text}`);
        // setText("");
        searchRestaurant(text)
    }


    const onSubmit2 = (e) => {
        e.preventDefault();
        searchRestaurant2(description, avgCost);
    }

    const options1 = [
        'buttery', 'creamy', 'crispy', 'fluffy', 'lemoney', 'mild spicy', 'salty', 'sour', 'spicy', 'super spicy', 'super sweet', 'sweet', 'sweet and sour', 'tangy'
      ];
      const defaultOption1 = options1[0];

      const options2 = [
        '10', '20', '30', '40', '50', '60', '70', '80', '90'
      ];
      const defaultOption2 = options2[0];

    return (
        <div>
            
            {!restaurants ? 
                (<Preloader />) : 
                (<div>
                    <div>
                        <input type="button" value={isSearch ? "Filters" : "Search"} onClick={changeSearch} className="btn btn-dark red btn-block" ></input>
                    </div>
                    {isSearch ? (<div>
                        <form onSubmit={onSubmit1} className="form">
                            <input type="text" name="text" placeholder="Search Restaurants..." value={text}
                            onChange={onChange1}></input>
                            <input type="submit" value="Search" className="btn btn-dark red btn-block" ></input>
                        </form>
                    </div> ): 
                    (<form onSubmit={onSubmit2}>
                        <label>Description: </label>
                        <Dropdown options={options1} onChange={onChange2} value={defaultOption1} />
                        <label>Average Cost: </label>
                        <Dropdown options={options2} onChange={onChange3} value={defaultOption2} />
                        <input type="submit" value="Search" className="btn btn-dark red btn-block" ></input>
                    </form>)
                    // <></>
                    }
                    {restaurants.map(restaurant => <RestaurantItem restaurant={restaurant} key={restaurant.restaurantId} />)}
                </div>)
            }
        </div>
    )
}

Home.propTypes = {
    restaurants: PropTypes.array.isRequired,
    getRestaurants: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    restaurants: state.restaurant.restaurants
})

export default connect(mapStateToProps, { getRestaurants, searchRestaurant,searchRestaurant2, loadUser })(Home)
