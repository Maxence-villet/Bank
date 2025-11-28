import { useState, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ModifyPassword() {
    const [error, setError] = useState("");
    const [password, setPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const { token } = useAuth();

    function verifPassword() {

        if (!newPassword.trim() || !confirmNewPassword.trim() || !password.trim()) {
            setError("Les champs ne doivent pas etre vide");
            return false
        }

        if (newPassword !== confirmNewPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return false
        }

        if (newPassword.trim() == password.trim()) {
            setError("Le mot de passe actuel et le nouveau mot de passe ne doivent pas être identique")
            return false
        }

        const hasMinLength = newPassword.length >= 8;
        const hasDigit = /\d/.test(newPassword); // regarde s'il y a un nombre(digit)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword); // compte le nombre de charactère special

        if (!hasMinLength || !hasDigit || !hasSpecialChar) {
            setError("Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.");
            return false
        }

        return true
    }

    async function Modify() {
        setError("");
        let verif = verifPassword();

        if (verif) {
            try {
                const requestBody = {
                    current_password: password,
                    new_password: newPassword
                };

                const response = await fetch('http://localhost:8000/auth/change-password', { 
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody), 
                });

                const data = await response.json();

                if (!response.ok) {
                    const errorMessage = data.message || data.detail?.[0]?.msg || JSON.stringify(data) || 'Erreur lors de la récupération de mot de passe';
                    throw new Error(errorMessage);
                }
                
                navigate('/connexion');

            } catch (err: any) {
                setError("Erreur lors de la modification du mot de passe");
            }         
        }
    }

    const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleNewPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmNewPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setConfirmNewPassword(e.target.value);
    };

    return (
        <div className="px-7 py-8 border-0 rounded-2xl bg-white w-[400px]">
            <h2 className="text-2xl font-bold mb-6 text-left">Changer de mot de passe</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            <form className="flex flex-col gap-1">
                <label className="text-left font-normal">Mot de passe actuel</label>
                <input  type="password" className="border-2 border-gray-300 rounded-md px-3 py-3 mb-3"
                        value={password} onChange={handlePasswordChange}/>

                <label className="text-left font-normal">Nouveau mot de passe</label>
                <input  type="password" className="border-2 border-gray-300 rounded-md px-3 py-3 mb-3"
                        value={newPassword} onChange={handleNewPasswordChange}/>

                <label className="text-left font-normal">Confirmer le nouveau mot de passe</label>
                <input  type="password" className="border-2 border-gray-300 rounded-md px-3 py-3"
                        value={confirmNewPassword} onChange={handleConfirmNewPasswordChange}/>
                    

                <div className="flex flex-row gap-2 pt-5 text-md">
                    <button type="button" onClick={() =>  Modify() } className="bg-[#58C5C3] rounded-md px-8 py-3 font-semibold">Modifier</button>
                </div>
            </form>
        </div>
    )
}

export default ModifyPassword;