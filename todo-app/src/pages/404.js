import Link from 'next/link';

export default function Todo(){
    return (<>
        <div>Sorry, but there don't appear to be any todo items here {':('}</div><br></br>
        <Link href="/todos"><button className="button is-primary">Return to your todo list</button></Link>
    </>);
};