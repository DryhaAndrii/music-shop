import { useState } from 'react';
import Button from '../../button/button';
import Input from '../../input/input';
import './search.scss';
import Form from '../../form/form';
import { toast } from 'react-toastify';
import Loading, { useLoading } from '../../Loading/loading';
import FindedContent from './findedContent/findedContent';

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g;

const apiUrl = process.env.REACT_APP_API_URL;

export default function Search() {
    const { hideLoading, showLoading, isShow } = useLoading();
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const onInputChange = (e) => {
        const newValue = e.target.value
            .replace(NO_SPACE_AT_THE_START_REGEXP, '')
            .replace(NO_MULTIPLE_SPACES_REGEXP, ' ')
            .slice(0, 50);
        setSearchValue(newValue);
    };

    async function buttonHandler(event) {
        event.preventDefault();
        if (searchValue.length === 0) {
            return toast.error('Enter search value');
        }

        await fetchSearch();
    }

    async function fetchSearch() {
        try {
            showLoading();
            const response = await fetch(`${apiUrl}search?query=${encodeURIComponent(searchValue)}`, {
                method: 'GET',
                credentials: 'include',
            });
            const status = response.status;
            if (status === 200) {
                const data = await response.json();
                return setSearchResults(data.results);
            }
            const data = await response.json();
            toast.error(data.message);
        } catch (error) {
            toast.error('Some error');
        }
        finally {
            hideLoading();
        }
    }

    return (
        <div className='searchWrapper'>
            <Form >
                <Loading isShow={isShow} />
                <Button buttonText={'Search'} onClick={buttonHandler} />
                <Input onChangeHandler={onInputChange} value={searchValue} />
                <Button buttonText={'Clear'} onClick={(event) => { event.preventDefault(); setSearchValue(''); setSearchResults(null) }} />
            </Form>
            <FindedContent searchResults={searchResults} />
        </div>

    )
}