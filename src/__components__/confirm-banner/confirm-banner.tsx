import './confirm-banner.css';
import { checkMark, failMark } from "home/config";
import { render, unmountComponentAtNode } from "react-dom";

interface ConfirmBannerProps {
    message: string;
    onSelect: (selection: boolean) => any;
}
function ConfirmBanner({ message, onSelect }: ConfirmBannerProps) {
    return (
        <>
            <span className="ConfirmBanner__message">{message}</span>
            <button className="ConfirmBanner__btn confirm" onClick={() => onSelect(true)}>{checkMark}</button>
            <button className="ConfirmBanner__btn cancel" onClick={() => onSelect(false)}>{failMark}</button>
        </>
    )
}

export default function ConfirmWithBanner(message: string): Promise<boolean> {
    if (document.getElementById(`confirm-banner-${message}`)) {
        return new Promise(() => {});
    }

    return new Promise((resolve) => {
        const div = document.createElement('div');
        div.setAttribute('id', `confirm-banner-${message}`);
        div.setAttribute('class', 'ConfirmBanner');
        document.getElementById('root')!.appendChild(div);

        function onSelectionMade(selection: boolean) {
            unmountComponentAtNode(div);
            div.remove();
            resolve(selection);
        }

        render(<ConfirmBanner message={message} onSelect={onSelectionMade} />, div);
    });
}
