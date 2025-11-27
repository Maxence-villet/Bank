import { useState, type SetStateAction } from "react";

function AddBeneficiary() {
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");

    function PostBeneficiary() {
        setError("")

        if (accountName.trim() == "") {
            setError("Le nom du compte ne peut pas être vide")
        } else if (accountNumber.trim() =="") {
            setError(error + "Le numéro de compte ne peux pas être vide")
        } else {
            resetAll()
        }
    }

    function resetAll() {
        setIsAdding(!isAdding)
        setAccountName("")
        setAccountNumber("")
        setError("")
    }

    const handleNumberChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setAccountNumber(e.target.value);
    };

    const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setAccountName(e.target.value);
    };

    return (
        <div>
            <button onClick={() => resetAll()} className="border-2 border-black rounded-md font-bold text-xl px-5 py-3 flex flex-row gap-1 text-center">
                Ajouter un beneficiaire
                <svg width="24" height="24" viewBox="-4 -1 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5Z" fill="#002222"/>
                </svg>
            </button>
            {isAdding && (
                <div className="px-7 py-8 border-0 rounded-2xl bg-white shadow-lg z-10 w-[700px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-4xl font-bold mb-6 text-left">Ajouter un beneficiaire</h2>
                    {error != "" &&(
                        <p className="font-bold text-red-500 text-left">{ error }</p>
                    )
                    }
                    <form className="flex flex-col gap-4">
                        <input  type="text" placeholder="Nom du compte" className="border-2 border-gray-300 rounded-md px-3 py-3" 
                                value={accountName} onChange={handleNameChange}/>
                        <input  type="text" placeholder="Numéro du compte" className="border-2 border-gray-300 rounded-md px-3 py-3" 
                                value={accountNumber} onChange={handleNumberChange}/>

                        <div className="flex flex-row gap-2 pt-3 text-xl">
                            <button type="button" onClick={() => resetAll()} className="rounded-md border-2 px-6 py-3 font-bold">Annuler</button>
                            <button type="button" onClick={() => PostBeneficiary()} className="bg-[#58C5C3] rounded-md px-6 py-3 font-bold">Ajouter</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddBeneficiary;