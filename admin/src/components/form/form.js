import './form.scss';
export default function Form({ handleSubmit, children }) {
    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    );
}


