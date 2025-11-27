import type SvgIconProps from '../../types/svg';


const ArrowButton = ({ fillColor }: SvgIconProps) => {
    const ARROW_ICON_PROPS: SvgIconProps = {
    path: "M9.41066 3.57733C9.7361 3.25189 10.2637 3.25189 10.5892 3.57733L16.4225 9.41066C16.7479 9.7361 16.7479 10.2637 16.4225 10.5892L10.5892 16.4225C10.2637 16.7479 9.7361 16.7479 9.41066 16.4225C9.08523 16.0971 9.08523 15.5694 9.41066 15.244L13.8214 10.8333H4.16659C3.70635 10.8333 3.33325 10.4602 3.33325 9.99992C3.33325 9.53968 3.70635 9.16658 4.16659 9.16658H13.8214L9.41066 4.75584C9.08523 4.4304 9.08523 3.90277 9.41066 3.57733Z",
    fillColor: fillColor, 
    }; 

    return (
        <>
        <svg 
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            >
            <path 
                    d={ARROW_ICON_PROPS.path} 
                    fill={ARROW_ICON_PROPS.fillColor}
            />
        </svg>
        </>
    )
}

export default ArrowButton;