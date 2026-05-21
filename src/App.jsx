import gsap from 'gsap';
import { Navbar, Welcome, Dock } from './components'

import { Draggable } from "gsap/Draggable";
import {Safari, Terminal, Resume} from "#/windows/index.js";
gsap.registerPlugin(Draggable);

function App() {
    return (
        <main>
    <Navbar />
    <Welcome />
    <Dock />

    <Terminal />
    <Safari />
    <Resume />
        </main>
    )
}

export default App
