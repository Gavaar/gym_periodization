import { FireStore } from "home/__helpers/store/firestore";
import { Dispatch, useEffect, useState } from "react";
import { COLORS } from "./user-config.config";

interface UserConfig {
    color: string;
}

function setRootColor(color = COLORS.red) {
    const root = document.documentElement;
    root.style.setProperty('--main', color);
    root.style.setProperty('--main-light', `${color}a8`);
}

const configStore = new FireStore<UserConfig>('config');

export default function useColor() {
    const [selectedColor, setSelectedColor] = useState<string>();

    useEffect(() => {
        configStore.get().then((config) => {
            const { color } = (config || {}) as UserConfig;
            if (color) {
                setSelectedColor(color);
            } else {
                setSelectedColor(COLORS.red);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedColor) {
            setRootColor(selectedColor);
            configStore.patch({ color: selectedColor });
        }
    }, [selectedColor]);

    return  [selectedColor, setSelectedColor] as [string, Dispatch<string>];
}
