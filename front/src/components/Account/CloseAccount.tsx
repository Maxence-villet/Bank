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
            <button onClick={() => resetAll()} className="border-2 rounded-md px-3 py-2">Cloturer</button>
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