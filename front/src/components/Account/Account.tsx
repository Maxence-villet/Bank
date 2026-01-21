import CloseAccount from "./CloseAccount"
import "../../assets/CreditCardButton.svg"

interface AccountType {
    id: string,
    name: string,
    amount: number,
    iban: string,
    onClose?: () => void;
}

function Account({ id, name, amount, iban, onClose }: AccountType) {
    return (
        <>
            <div className="text-left flex flex-col gap-6 background-white border-0 rounded-2xl p-6 bg-white max-w-2xl">
                <h2 className="text-xl">{name}</h2>
                <div className="flex flex-column justify-between">
                    <p className="font-bold">{amount.toFixed(2)}€</p>
                    <p className="text-gray-400">{iban}...</p>
                </div>
                <div className="font-bold flex flex-row gap-4">
                    <button className="border-2 rounded-md px-3 py-2 flex flex-row gap-1 items-center">
                        <svg width="16" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.99992 3.33333C1.63173 3.33333 1.33325 3.63181 1.33325 4C1.33325 4.36819 1.63173 4.66667 1.99992 4.66667H2.00659C2.37478 4.66667 2.67325 4.36819 2.67325 4C2.67325 3.63181 2.37478 3.33333 2.00659 3.33333H1.99992Z" fill="#2D3648"/>
                            <path d="M5.33325 3.33333C4.96506 3.33333 4.66659 3.63181 4.66659 4C4.66659 4.36819 4.96506 4.66667 5.33325 4.66667H13.9999C14.3681 4.66667 14.6666 4.36819 14.6666 4C14.6666 3.63181 14.3681 3.33333 13.9999 3.33333H5.33325Z" fill="#2D3648"/>
                            <path d="M5.33325 7.33333C4.96506 7.33333 4.66659 7.63181 4.66659 8C4.66659 8.36819 4.96506 8.66667 5.33325 8.66667H13.9999C14.3681 8.66667 14.6666 8.36819 14.6666 8C14.6666 7.63181 14.3681 7.33333 13.9999 7.33333H5.33325Z" fill="#2D3648"/>
                            <path d="M4.66659 12C4.66659 11.6318 4.96506 11.3333 5.33325 11.3333H13.9999C14.3681 11.3333 14.6666 11.6318 14.6666 12C14.6666 12.3682 14.3681 12.6667 13.9999 12.6667H5.33325C4.96506 12.6667 4.66659 12.3682 4.66659 12Z" fill="#2D3648"/>
                            <path d="M1.33325 8C1.33325 7.63181 1.63173 7.33333 1.99992 7.33333H2.00659C2.37478 7.33333 2.67325 7.63181 2.67325 8C2.67325 8.36819 2.37478 8.66667 2.00659 8.66667H1.99992C1.63173 8.66667 1.33325 8.36819 1.33325 8Z" fill="#2D3648"/>
                            <path d="M1.99992 11.3333C1.63173 11.3333 1.33325 11.6318 1.33325 12C1.33325 12.3682 1.63173 12.6667 1.99992 12.6667H2.00659C2.37478 12.6667 2.67325 12.3682 2.67325 12C2.67325 11.6318 2.37478 11.3333 2.00659 11.3333H1.99992Z" fill="#2D3648"/>
                        </svg>
                        Transactions
                    </button>
                    <CloseAccount id={id} onClose={onClose} />
                </div>
            </div>
        </>
    );
}

export default Account;