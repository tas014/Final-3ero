import MenuItem from "./MenuItem";

export default function ProfileMenu (props) {

    const { onSelect, selected} = props;

    return(
        <>
            <MenuItem onSelect={onSelect} label={'Account Data'} selected={selected} />
            <MenuItem onSelect={onSelect} label={'Account Options'} selected={selected} />
        </> 
    )
}