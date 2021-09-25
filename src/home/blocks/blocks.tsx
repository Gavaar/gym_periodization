import './blocks.css';
import Block from "./block/block";
import { useContext } from 'react';
import { BlocksProvider } from './blocks.context';
import { SelectedBlockIdProvider } from './selected-block-id';

function Blocks(): JSX.Element {
    const [blocks] = useContext(BlocksProvider);
    const [selected, onSelect] = useContext(SelectedBlockIdProvider)

    return (
        <div className="Blocks">
            {blocks.map((_block, index) => {
                if (_block) return (
                    <div onClick={() => onSelect(_block.id)} key={index}>
                        <Block block={_block} selected={_block.id === selected}/>
                    </div>
                );
                return <span>loading...</span>
            })}
        </div>
    );
}
export default Blocks;
