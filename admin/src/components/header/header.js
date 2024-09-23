import Button from '../button/button';
import { myStore } from '../../store/store';
import './header.scss';
import { toast } from 'react-toastify';
import Search from './search/search';



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
            const status = response.status;
            if (status === 200) {
                return window.location.href = '/login';
            }
            const data = await response.json();
            toast.error(data.message);
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
                        : <>
                            <Search />
                            <Button buttonText={'Log out'} onClick={LogOut} />
                        </>
                    }

                </div>
            </div>
        </header>
    )
}