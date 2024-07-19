import './attribute.scss';

function Attribute({ name, value, options, chooseOption }) {
    if(!options) return null;
    return (
        <div className="attribute">
            <p>{name}</p>
            <p>{value}</p>
            <div className='options'>
                {options.map((option, index) => {
                    if (option === value) {
                        return <p key={index} className='chosen' onClick={() => { chooseOption(name, option) }}>{option}</p>
                    }
                    return <p key={index} onClick={() => { chooseOption(name, option) }}>{option}</p>
                }
                )}
            </div>
        </div>
    );
}

export default Attribute;