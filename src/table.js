import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"


// Example of a data array that
// you might receive from an API

function Table() {
    const [data, setData] = React.useState([])
    const navigate = useNavigate()

    const navigateTo = () => navigate(`/`)

    React.useEffect(() => {
        fetch('https://coding-challenge.onrender.com/api/user/')
            .then(response => response.json())
            .then(data => {
                setData(data.data)
                console.log(data)
            })
    }, [])
    return (
        <div className="table-page">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Unique ID</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.selector}</td>
                            <td>{val.unique_id}</td>
                        </tr>
                    )
                })}
            </table>
            <Button onClick={navigateTo}>Go to Form Page</Button>
        </div>
    );
}

export default Table;