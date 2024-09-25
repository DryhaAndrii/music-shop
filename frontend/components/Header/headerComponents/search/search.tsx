'use client';
import { useState } from 'react';
import styles from "../../styles.module.scss";
import Input from "@/components/input/input";
import MyButton from "@/components/myButton/myButton";
import searchByValue from '@/functions/search';
import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from '@/types/toastTypes';
import SearchResults from './searchResults/searchResults';

const STARTS_WITH_SPACE = /^\s/;  //If the string starts with a space
const MULTIPLE_SPACES = /\s{2,}/;  //If the string contains multiple spaces

function Search() {
    const [, addToast] = useAtom(addToastAtom);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState(null);

    async function buttonHandler(event: any) {
        event.preventDefault();
        if (searchValue.length === 0) {
            return addToast({ message: "Enter search value", type: TOAST_TYPES.INFO });
        }
        const response = await searchByValue(searchValue);
        if (response.error) {
            return addToast({ message: response.error, type: TOAST_TYPES.ERROR });
        }
        console.log(response);
        setSearchResults(response);
    }

    function inputChangeHandler(event: any) {
        let value = event.target.value;

        if (STARTS_WITH_SPACE.test(value)) {
            value = value.trimStart();
        }

        if (MULTIPLE_SPACES.test(value)) {
            value = value.replace(MULTIPLE_SPACES, ' ');
        }

        setSearchValue(value);
    }
    function hideEverything() {
        setSearchResults(null);
        setSearchValue('');
    }
    return (
        <form className={styles.search} onSubmit={buttonHandler}>
            <MyButton onClick={buttonHandler}>
                <span className="material-symbols-outlined">search</span>
            </MyButton>
            <Input placeholder="Search" onChangeHandler={inputChangeHandler} value={searchValue} />
            <MyButton onClick={hideEverything}>
                <span className="material-symbols-outlined">
                    backspace
                </span>
            </MyButton>
            <SearchResults searchResults={searchResults} hideEverything={hideEverything} />
        </form>
    );
}

export default Search;