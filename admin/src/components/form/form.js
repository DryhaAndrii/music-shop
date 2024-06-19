import './form.scss';
export default function Form({ handleSubmit, children }) {
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {children}
        </form>
    );
}


