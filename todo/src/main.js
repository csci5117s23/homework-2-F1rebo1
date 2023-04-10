import './todo.css';
import { useNavigate } from "react-router-dom";

export default function Homepage(){
    const navigate = useNavigate();

    function handleNavigation() {
        navigate('/todos');
    }

    return (<>
        <section class="section">
            <div class="container">
                <h1 id="appName">Productivity Corner</h1><br></br>
                <div id="main-text">Thanks for signing up!</div><br></br>
                <button class="button is-link" onClick={handleNavigation}>Start creating todo lists now!</button>
            </div>
        </section>
    </>);
}