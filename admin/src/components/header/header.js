import Button from '../button/button';
import { myStore } from '../../store/store';
import './header.scss';
import { toast } from 'react-toastify';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL;

export default function Header() {

    const setLoading = myStore(state => state.setLoading);
    async function LogOut() {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}logout`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            if(data.isLoggedOut){
                window.location.href = '/login';
            }
        } catch (error) {
            toast.error('An error occurred while checking token, maybe server is not working so you can do nothing now');
            setLoading(false);
        }
    }
    return (
        <header>
            <div className='container'>
                <div className='wrapper'>
                    <h1><a href='/'>Admin panel</a></h1>
                    {window.location.pathname === '/login'
                        ? <></>
                        : <Button buttonText={'Log out'} onClick={LogOut} />
                    }

                </div>
            </div>
        </header>
    )
}