import Dropdown from "./dropdown"

const options1 = ["Tous mes comptes", "optional ", "optional ", "optional "];
const options2 = ["Janvier 2025", "optional2 ", "optional3 ", "optional4 "];
const dropdownList = () => {
    return (
        <div className="flex flex-row gap-[10px]">
            <Dropdown options={options1} />
            <Dropdown options={options2} />
        </div>
    )
}
export default dropdownList;