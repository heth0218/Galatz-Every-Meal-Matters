import React, {useState} from 'react';
import axios from 'axios';

const ShowSales = () => {
    const [date, setDate] = useState();
    const [data, setData] = useState([]);
    const onSubmit = async(e) => {
        e.preventDefault();
        console.log(date);
        const res = await axios.get(`/api/restaurant/filter/${date}`);
        console.log(res.data);
        setData(res.data);
    }

    const handleChange = event => {
        setDate(event.target.value);
      };

    return <div>
        <form onSubmit={onSubmit}>
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" value={date} onChange={handleChange} />
            <input type="submit" className="btn btn-danger red btn-block" />
        </form>
        <br></br>
        <table>
        <thead>
          <tr>
              <th>Spent Cost</th>
              <th>User Name</th>
              <th>Restaurant Name</th>
              <th>Order Date</th>
          </tr>
        </thead>

        <tbody>
            {data.length != 0 ? data.map(el => <tr key={el.orderDate}><td>{el.SpentCost}</td><td>{el.userName}</td><td>{el.name}</td><td>{el.orderDate}</td></tr>) : <></>}
          {/* <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr> */}
        </tbody>
      </table>
    </div>;
}

export default ShowSales;