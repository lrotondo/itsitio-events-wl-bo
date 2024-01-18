import { useState, useLayoutEffect } from "react";

export const useWindowSize = () => {
    const [size, setSize] = useState({ w: 0, h: 0 });
    useLayoutEffect(() => {
        const updateSize = () => {
            setSize({ w: window.innerWidth, h: window.innerHeight });
        };
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};
