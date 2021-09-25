import { VolumeState } from "./volume.state";

export function Volume({ volume }: { volume: VolumeState }) {
    return (<i>{volume.total ?
            <span>Total: {volume.total}</span> :
            null}</i>);
}
