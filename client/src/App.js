import './App.css';
import {useEffect, useState} from "react";
import {useQuery,gql} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";

function App() {
    const {data, loading, error} = useQuery(gql`
    query {
      getAllUsers {
        id
        username
        age
      }
}
`)
    const [users, setUsers] = useState([]);
    console.log(data,loading,error);
    // useEffect(() => {
    // },[data])
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
