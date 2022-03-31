import './App.css';
import {useEffect, useState} from "react";
import {useQuery, gql, useMutation} from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

function App() {
    const {data, loading, error,refetch} = useQuery(GET_ALL_USERS)
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);
    const [newUser] = useMutation(CREATE_USER);
    const getAll = (e) => {
        e.preventDefault();
        refetch();

    }
    const addUser = (e) => {
        e.preventDefault();
        newUser({
            variables: {
                input: {username, age}
            }
        }).then(({data}) => {
            console.log(data);
            setUsername('');
            setAge(0);
        })
    }
    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])
    if (loading) return <CircularProgress/>
    return (
        <div className="App">
            <form>
                <input placeholder={('Имя')} value={username} onChange={(e) => setUsername(e.target.value)}
                       type="text"/>
                <input placeholder={('Возраст')} value={age} onChange={(e) => setAge(e.target.valueAsNumber)} type="number"/>
                <div className="btns">
                    <button onClick={(event) => {
                        addUser(event);
                    }}>Создать
                    </button>
                    <button onClick={(e) => {
                        getAll(e);
                    }}>Получить</button>
                </div>

            </form>
            <div>{users.map( user =>

                <div key={user.id} className="user">
                    {user.id} {user.username} {user.age}
                </div>
            )}</div>
        </div>
    );
}

export default App;
