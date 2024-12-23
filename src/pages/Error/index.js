import { Link } from 'react-router-dom';
import './erro.css';
function Error() {
    return (
        <div className='erro'>
            <h1>Ops pagina não encontrada!</h1><br/><br/>
            <Link to="/">Ir para Home</Link>
        </div>
    );
}

export default Error;