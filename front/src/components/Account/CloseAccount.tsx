import { useState} from "react";

function CloseAccount(id : {id: number}) {
    const [isClosing, setIsClosing] = useState(false);
    const [error, setError] = useState("");

    function closeAccount() {
        console.log(id);
        resetAll()
    }

    function resetAll() {
        setIsClosing(!isClosing)
        setError("")
    }

    return (
        <div>
            <button onClick={() => resetAll()} className="border-2 rounded-md px-3 py-2 flex flex-row gap-1 items-center">
                <svg width="18" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.66658 6.66667C7.03478 6.66667 7.33325 6.96514 7.33325 7.33333V11.3333C7.33325 11.7015 7.03478 12 6.66658 12C6.2984 12 5.99992 11.7015 5.99992 11.3333V7.33333C5.99992 6.96514 6.2984 6.66667 6.66658 6.66667Z" fill="#2D3648"/>
                    <path d="M9.99992 11.3333V7.33333C9.99992 6.96514 9.70144 6.66667 9.33325 6.66667C8.96506 6.66667 8.66658 6.96514 8.66658 7.33333V11.3333C8.66658 11.7015 8.96506 12 9.33325 12C9.70144 12 9.99992 11.7015 9.99992 11.3333Z" fill="#2D3648"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66659 3.33333V2.66667C4.66659 2.13623 4.8773 1.62753 5.25237 1.25245C5.62744 0.877382 6.13615 0.666668 6.66658 0.666668H9.33325C9.86368 0.666668 10.3724 0.877382 10.7475 1.25245C11.1225 1.62753 11.3333 2.13623 11.3333 2.66667V3.33333H13.9999C14.3681 3.33333 14.6666 3.63181 14.6666 4C14.6666 4.36819 14.3681 4.66667 13.9999 4.66667H13.3333V13.3333C13.3333 13.8638 13.1225 14.3725 12.7475 14.7475C12.3724 15.1226 11.8637 15.3333 11.3333 15.3333H4.66659C4.13615 15.3333 3.62744 15.1226 3.25237 14.7475C2.8773 14.3725 2.66659 13.8638 2.66659 13.3333V4.66667H1.99992C1.63173 4.66667 1.33325 4.36819 1.33325 4C1.33325 3.63181 1.63173 3.33333 1.99992 3.33333H4.66659ZM6.19518 2.19526C6.32021 2.07024 6.48977 2 6.66658 2H9.33325C9.51006 2 9.67963 2.07024 9.80466 2.19526C9.92968 2.32029 9.99992 2.48986 9.99992 2.66667V3.33333H5.99992V2.66667C5.99992 2.48986 6.07016 2.32029 6.19518 2.19526ZM3.99992 4.66667V13.3333C3.99992 13.5101 4.07016 13.6797 4.19518 13.8047C4.3202 13.9298 4.48977 14 4.66659 14H11.3333C11.5101 14 11.6796 13.9298 11.8047 13.8047C11.9297 13.6797 11.9999 13.5101 11.9999 13.3333V4.66667H3.99992Z" fill="#2D3648"/>
                </svg>
                Cloturer
            </button>
            {isClosing && (
                <div className="px-7 py-8 border-0 rounded-2xl bg-white shadow-lg z-10 w-[700px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-4xl font-bold mb-6 text-left">Cloturer un compte</h2>
                    {error != "" &&(
                        <p className="font-bold text-red-500 text-left">{ error }</p>
                    )}
                    <p>Vous êtes sur le point de clôturer votre compte. Le solde de votre compte sera transféré sur votre compte principal.</p>
                    
                    <div className="flex flex-row gap-2 pt-5 text-xl">
                        <button onClick={() => resetAll()} className="rounded-md border-2 px-6 py-3 font-bold">Annuler</button>
                        <button type="button" onClick={() => closeAccount()} className="bg-[#EB7C3F] rounded-md px-6 py-3 font-bold">Cloturer</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CloseAccount;