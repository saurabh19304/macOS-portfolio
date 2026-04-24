import React from 'react'
import {useRef} from "react";
import {dockApps} from "#/constants/index.js";
import { Tooltip} from "react-tooltip";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Dock = () => {
    const dockRef = useRef(null);

    useGSAP( () => {
        const dock = dockRef.current;
        if(!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");
        const animateIcons = (mouseX) => {
            const {left} = dock.getBoundingClientRect();
            icons.forEach((icon) => {
                const {left: iconLeft, width} = icon.getBoundingClientRect();
                const  center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center)
                const intensity = Math.exp(-(distance ** 2.5) / 2000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration:0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMousmove = (e) => {
            const {left} = dock.getBoundingClientRect();

            animateIcons(e.clientX - left);
        };

const resetIcons = () => icons.forEach((icon) => gsap.to(icon, {
    scale: 1, y: 0, duration: 0.3, ease: "power1.out",
        }));
        dock.addEventListener("mousemove", handleMousmove);
        dock.addEventListener("mouseLeave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMousmove);
            dock.removeEventListener("mouseLeave", resetIcons);
        }
    }, []);



    const toggleApp = (app) => {
        //To Implement open window logic
    }
    return <section id="dock" >
        <div ref={dockRef} className="dock-container">
            {dockApps.map(({id, name, icon, canOpen})  => (
                <div key={id ?? name} className="relative flex justify-center">
                    <button
                        type="button"
                        className="dock-icon"
                        aria-label={name}
                        data-tooltip-id="dock-tooltip"
                        data-tooltip-content={name}
                        data-tooltip-delay-show={150}
                        disabled={!canOpen}
                        onClick={() => toggleApp({id, canOpen})}
                    >
                        <img
                        src={`/images/${icon}`}
                        alt={name}
                        loading="lazy"
                        className={canOpen ? "" : "opacity-60"}
                        />
                    </button>
                </div>
            ) )}

            <Tooltip id="dock-tooltip" top="top" className="tooltip"  />
        </div>
    </section>
}
export default Dock
