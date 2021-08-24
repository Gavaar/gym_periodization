import './blocks.css';
import Block from "./block/block";
import { useContext } from 'react';
import { BlocksContextProvider } from './blocks.context';
import { SelectedBlockProvider } from 'home/__states';

function Blocks(): JSX.Element {
    const blocks = useContext(BlocksContextProvider);
    const [selected, onSelect] = useContext(SelectedBlockProvider)

    return (
        <div className="Blocks">
            {blocks.map((_block, index) => {
                return (
                    <div onClick={() => onSelect(_block.id)} key={index}>
                        <Block block={_block} selected={_block.id === selected}/>
                    </div>
                );
            })}
        </div>
    );
}
export default Blocks;
