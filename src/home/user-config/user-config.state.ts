import { Dispatch, useEffect, useState } from "react";
import addClickOutsideBehavior from "__components__/__helpers/click-outside-behavior";

export default function useOpenClose(): [boolean, Dispatch<boolean>] {
    const [openClose, setOpenClose] = useState<boolean>(false);

    useEffect(() => {
        if (openClose) {
            addClickOutsideBehavior(() => {
                setOpenClose(false);
            });
        }
    }, [openClose, setOpenClose]);

    return [openClose, setOpenClose];
}
