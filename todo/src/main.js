import './todo.css';

import { useState } from "react";

export default function Homepage(){

    return <>
        <html>
            <head>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <title>Hello Bulma!</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
            </head>
            <body>
                <section class="section">
                    <div class="container">
                        <h1 id="main-text">Productivity Corner</h1>
                        <div id="main-text">Thanks for signing up!</div><br></br>
                        <button class="button is-link is-small">Start creating todo lists now!</button>
                    </div>
                </section>
            </body>
        </html>
    </>
}