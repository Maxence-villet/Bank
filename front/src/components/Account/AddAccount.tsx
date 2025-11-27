import { useState, type SetStateAction } from "react";

function addAccount() {
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");
    const [accountType, setAccountType] = useState("Compte Courant");
    const [accountName, setAccountName] = useState("");

    function PostAccount() {
        if (accountName == "") {
            setError("Le nom du compte ne peut pas être vide")
        } else {
            resetAll()
        }
    }

    function resetAll() {
        setIsAdding(!isAdding)
        setAccountName("")
        setAccountType("Compte Courant")
        setError("")
    }

    const handleTypeChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setAccountType(e.target.value);
    };

    const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setAccountName(e.target.value);
    };

    return (
        <div>
            <button onClick={() => resetAll()} className="border-2 border-black rounded-md font-bold text-xl px-5 py-3">Ajouter un compte +</button>
            {isAdding && (
                <div className="px-7 py-8 border-0 rounded-2xl bg-white shadow-lg z-10 w-[700px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-4xl font-bold mb-6 text-left">Ajouter un compte</h2>
                    {error != "" &&(
                        <p className="font-bold text-red-500 text-left">{ error }</p>
                    )
                    }
                    <form className="flex flex-col gap-1">
                        <label className="text-left font-semibold">Type de compte</label>
                        <select className="border-2 border-gray-300 rounded-md px-3 py-3 mb-2"
                                value={accountType} onChange={handleTypeChange}>

                            <option value="Compte Courant">Compte Courant</option>
                            <option value="Compte Epargne">Compte Epargne</option>
                        </select>
                        <input  type="text" placeholder="Nom du compte" className="border-2 border-gray-300 rounded-md px-3 py-3" 
                                value={accountName} onChange={handleNameChange}/>

                        <div className="flex flex-row gap-2 pt-5 text-xl">
                            <button type="button" onClick={() => resetAll()} className="rounded-md border-2 px-6 py-3 font-bold">Annuler</button>
                            <button type="button" onClick={() => PostAccount()} className="bg-[#58C5C3] rounded-md px-6 py-3 font-bold">Créer un compte</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default addAccount;