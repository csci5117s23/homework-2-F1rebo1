import Link from 'next/link';

export default function Todo(){
    return (<>
        <div>Sad pongal moment, but the page you're looking for doesn't exist {':('}</div><br></br>
        <Link href="/todos"><button className="button is-primary">Return to your todo list</button></Link>
    </>);
};