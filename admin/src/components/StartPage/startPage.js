
import StartPageHeader from './startPageHeader/startPageHeader';
import './startPage.scss';
import Categories from './categories/categories';
export default function StartPage() {
    return (
        <div className="startPage">
            <StartPageHeader />
            <Categories />

        </div>
    )
}