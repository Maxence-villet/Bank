import Dropdown from "./dropdown"

const dropdownList = () => {
    return (
        <div className="flex flex-row gap-[10px]">
            <Dropdown />
            <Dropdown />
        </div>
    )
}
export default dropdownList;