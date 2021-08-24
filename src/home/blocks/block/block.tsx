import './block.css';
import { ExerciseBlock } from './block.model';
import BlockHeader from './block-header/block-header';
import BlockBody from './block-body/block-body';

function Block({ block, selected }: { block: ExerciseBlock; selected: boolean; }): JSX.Element {
    return (
        <article className={'Block' + (selected ? ' selected' : '')}>
            <BlockHeader blockId={block.id} />
            {block ? <BlockBody block={block} /> : <span>loading...</span>}
        </article>
    );
}
export default Block;
