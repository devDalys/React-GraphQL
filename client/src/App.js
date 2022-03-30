import './App.css';
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./query/user";

function App() {
    const {loading, error, data} = useQuery(GET_ALL_USERS)
    console.log(data);
    const [users, setUsers] = useState([]);
    useEffect(() => {

    },[data])
    return (
        <div className="App">
            <form>
                <input type="text"/>
                <input type="number"/>
                <div className="btns">
                    <button>Создать</button>
                    <button>Получить</button>
                </div>

            </form>
            <div>{users.map(user =>
                <div className="user">
                    {user.id} {user.username} {user.age}
                </div>
            )}</div>
        </div>
    );
}

export default App;
