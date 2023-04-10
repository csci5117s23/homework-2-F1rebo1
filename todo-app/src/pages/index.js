import Link from 'next/link';

export default function Homepage(){
    // const navigate = useNavigate();

    // function handleNavigation() {
    //     navigate('/todos');
    // }

    return (<>
        <section className="section">
            <div className="container">
                <h1 id="appName">Productivity Corner</h1><br></br>
                <div id="main-text">Thanks for choosing us!</div><br></br>
                {/* <Link><button class="button is-link" onClick={handleNavigation}>Start creating todo lists now!</button></Link> */}
                <Link href="/signup"><button className="button is-link">Start creating todo lists now!</button></Link>
            </div>
        </section>
    </>);
}