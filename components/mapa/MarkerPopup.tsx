interface MarkerPopupProps {
    courtName: string;
    address: string;
    municipality: string;
    province: string;
}

export default function MarkerPopup(props: MarkerPopupProps) {
    return (
        <div>
            <div className='font-bold text-xl'>{props.courtName}</div>
            <div>{props.province}, {props.municipality}, {props.address}</div>
        </div>
    )
}

