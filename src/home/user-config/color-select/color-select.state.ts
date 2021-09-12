import { FireStore } from "home/__helpers/store/firestore";
import { UserProvider } from "home/user/user.context";
import { Dispatch, useContext, useEffect, useState } from "react";
import { COLORS } from "./color-select.config";

interface UserConfig {
    color: string;
}

function setRootColor(color = COLORS.red) {
    const root = document.documentElement;
    root.style.setProperty('--main', color);
    root.style.setProperty('--main-light', `${color}a8`);
}

const DEFAULT_CONFIG = { color: COLORS.red };

const configStore = new FireStore<UserConfig>('config');

export default function useColor(): [string | undefined, Dispatch<string>] {
    const [user] = useContext(UserProvider);
    const [selectedColor, setSelectedColor] = useState<string>();

    useEffect(() => {
        configStore.get().then((config) => {
            const { color } = (config || DEFAULT_CONFIG) as UserConfig;
            setSelectedColor(color);
        });
    }, [user]);

    useEffect(() => {
        if (selectedColor) {
            setRootColor(selectedColor);
            configStore.patch({ color: selectedColor });
        }
    }, [selectedColor]);

    return  [selectedColor, setSelectedColor];
}
