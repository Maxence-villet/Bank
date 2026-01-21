import type SvgIconProps from '../../types/svg';


const HomeButton = ({ fillColor }: SvgIconProps) => {
    const HOME_ICON_PROPS: SvgIconProps = {
    path: "M4.99992 15.8335H3.33325C1.95254 15.8335 0.833252 14.7826 0.833252 13.4863V7.41685C0.833252 6.79432 1.09664 6.1973 1.56549 5.75711L6.32141 1.29182C6.97228 0.680721 8.02756 0.680722 8.67843 1.29182L13.4344 5.75711C13.9032 6.1973 14.1666 6.79432 14.1666 7.41685V13.4863C14.1666 14.7826 13.0473 15.8335 11.6666 15.8335H9.99992M4.99992 15.8335V11.6668C4.99992 10.7464 5.74611 10.0002 6.66659 10.0002H8.33325C9.25373 10.0002 9.99992 10.7464 9.99992 11.6668V15.8335M4.99992 15.8335H9.99992",
    fillColor: fillColor, 
    }; 

    return (
        <>
        <svg 
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            >
            <path 
                    d={HOME_ICON_PROPS.path} 
                    stroke={HOME_ICON_PROPS.fillColor}
                    strokeWidth="1.66667"
            />
        </svg>
        </>
    )
}

export default HomeButton;