import Link from 'next/link';

export default function error(){
    return (<>
        <div>Oops! You ran into a 404 Error {':('}</div><br></br>
        <Link href="/todos"><button className="button is-primary">Return to your todo list</button></Link>
    </>);
};