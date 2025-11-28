import { useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

function ModifyMail() {
    const [error, setError] = useState("");
    const [mail, setMail] = useState('');
    const navigate = useNavigate();

    const handleMailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setMail(e.target.value);
    };

    function verifMail() {
        if (!mail) {
            setError("Les champs ne doivent pas etre vide");
            return false
        }
        const regex = /^\S+@\S+\.\S+$/.test(mail);

        if (!regex) {
            setError("L'email donné n'est pas valide")
        }

    }

    async function Modify() {
        setError("");
        let verif = verifMail();

        if (verif) {
            navigate('/connexion');
        }
    }

    return (
        <div className="px-7 py-8 border-0 rounded-2xl bg-white w-[400px] h-full">
            <h2 className="text-2xl font-bold mb-6 text-left">Changer d'email</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            <form className="flex flex-col gap-1">
                <label className="text-left font-normal">Email</label>
                <input  type="mail" className="border-2 border-gray-300 rounded-md px-3 py-3"
                        value={mail} onChange={handleMailChange}/>

                <div className="flex flex-row gap-2 pt-5 text-md">
                    <button type="button" onClick={() =>  Modify()} className="bg-[#58C5C3] rounded-md px-8 py-3 font-semibold">Modifier</button>
                </div>
            </form>
        </div>
    )
}

export default ModifyMail;