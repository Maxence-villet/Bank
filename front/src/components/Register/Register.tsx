import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sideIllustration from '../../assets/side-illustration.png'; 

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            setIsLoading(false);
            return;
        }

        try {
            const requestBody = {
                first_name: firstName, 
                last_name: lastName,
                email: email,
                password: password,
            };

            const response = await fetch('http://localhost:8000/user/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody), 
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message || data.detail?.[0]?.msg || JSON.stringify(data) || 'Erreur lors de l\'inscription.';
                throw new Error(errorMessage);
            }
            setSuccess(data.message || "Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
            
            setTimeout(() => {
                navigate('/connexion');
            }, 2000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    
    return (
        <div className="flex h-screen w-full bg-white font-sans">
            <div className="w-full md:w-1/2 flex flex-col items-start px-8 md:px-16 lg:px-24 py-10 h-screen overflow-y-auto">
                <div className="w-full max-w-md mx-auto">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="relative w-10 h-10">
                            <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_i_1387_84)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M33.6361 15.2646L12.6052 34.7856C12.9052 35.089 13.1935 35.3806 13.5406 35.6602L21.8412 42.7403C22.467 43.2722 23.3802 43.2722 24.006 42.7403C25.5002 41.4552 28.424 38.9563 31.9007 35.9934C38.5776 30.2876 39.1659 21.9164 33.6361 15.2646Z"
                                    fill="#58C5C3"
                                />
                                </g>

                                <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.441 15.2664C7.22059 21.066 7.41086 29.4769 12.7026 34.7769L23.1495 25.1882C29.5412 19.3172 30.0347 8.82432 23.7262 2.87598C23.7262 2.87598 17.6615 9.46674 12.441 15.2664Z"
                                fill="#58C5C3"
                                />

                                <defs>
                                <filter id="filter0_i_1387_84" x="0" y="0" width="47" height="47" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dx="4" dy="4" />
                                    <feGaussianBlur stdDeviation="4" />
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1387_84" />
                                </filter>
                                </defs>
                            </svg>
                        </div>
                        <span className="text-4xl font-bold text-gray-900 ">FINVO</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                        Créez votre compte
                    </h1>
                    <h2 className="text-gray-600 text-lg mb-8 font-medium">
                        Rejoignez des milliers d'utilisateurs
                    </h2>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline"> {success}</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="border-t border-gray-900 mt-8 pt-6"></div>
                        
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                            <input 
                                type="text" 
                                id="firstName"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                            <input 
                                type="text" 
                                id="lastName"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
                            <input 
                                type="password" 
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirmez le mot de passe</label>
                            <input 
                                type="password" 
                                id="confirmPassword"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className={`
                                    bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-md transition duration-300 w-auto inline-block
                                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                {isLoading ? "Inscription..." : "S'inscrire"}
                            </button>
                        </div>

                        <div className="border-t border-gray-500 mt-8 pt-6"></div>
                        <span className="ml-4 text-sm text-gray-400 inline-block"><p>Vous avez déjà un compte ?</p></span>
                        <span className="ml-4 text-sm text-teal-500">
                            <a href="/connexion" className="hover:underline">Se connecter</a>
                        </span>
                    </form>
                </div>
            </div>

            <div className="hidden md:block md:w-1/2 relative bg-teal-900">
                <img 
                    src={sideIllustration}
                    alt="Illustration Finance"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10 text-white">
                <h3 className="text-5xl font-extrabold mb-4 leading-tight">
                    La banque,<br />simplifiée
                </h3>
                <p className="text-lg max-w-sm">
                    Dashboard tout en un pour le paiement <br />et suivre vos transactions
                </p>
            </div>
            </div>
        </div>

        
    );
};

export default RegisterForm;
