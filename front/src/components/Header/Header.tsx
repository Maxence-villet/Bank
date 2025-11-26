interface HeaderProps {
    onClickBurger: () => void;
}


function Header({ onClickBurger }: HeaderProps) {
    return (
        <header>
            <div className="flex flex-row bg-white w-full p-3 shadow-sm h-[60px] px-3 justify-between z-[9] fixed top-0">
                <div className="flex">
                    <button onClick={onClickBurger}>
                        <img src="src/assets/BurgerButton.png" alt="BurgerButton"/>
                    </button>
                    <img src="src/assets/Logo.png" alt="Finvo"/>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-row p-2 rounded-md border-gray-300 border-2 gap-2 bg-gray text-xs md:w-[250px] w-[100px] transition-all duration-300 ease-in-out">
                        <input type="text" placeholder="Rechercher une transaction" className="placeholder-black border-none outline-none text-xs w-full"/>
                        <img src="src/assets/SearchButton.png" alt="SearchButton"/>
                    </div>
                    <img src="src/assets/IconContainer.png" alt="IconContainer" />
                </div>
            </div>
        </header>
    )
}

export default Header;