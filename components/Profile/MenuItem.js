export default function MenuItem (props) {

    const { onSelect, label, selected } = props;

    return(
        <button className={label == selected ? 'menuListItem menuListSelected' : 'menuListItem'} onClick={() => onSelect(label)}>{label}</button>
    )
}