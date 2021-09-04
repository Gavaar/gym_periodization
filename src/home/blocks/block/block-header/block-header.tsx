interface BlockHeaderProps { blockId: number; }
function BlockHeader({ blockId }: BlockHeaderProps): JSX.Element {
    const title = blockId !== -1 ? `Block #${`${blockId}`.substring(0, 7)}` : `New Block`;

    return (
        <div>
            <h3 className="Block__title">{title}</h3>
            <hr className="delimiter" />
            <h4 className="Block__week">
                <span className="Block__week-exercise">Exercise</span>
                <span className="Block__week-weight">Weight</span>
                <div className="Block__week-successes">
                    <span>W1</span>
                    <span>W2</span>
                    <span>W3</span>
                    <span>DL</span>
                </div>
            </h4>
            <hr className="delimiter" />
        </div>
    );
}
export default BlockHeader;
