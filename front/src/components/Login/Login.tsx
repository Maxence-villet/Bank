import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sideIllustration from '../../assets/side-illustration.png';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new URLSearchParams();
   
    formData.append('username', email);
    formData.append('password', password);


    try {
      const response = await fetch('http://localhost:8000/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });


      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.detail || 'Erreur d\'authentification. Veuillez vérifier vos identifiants.');
      }

      localStorage.setItem('access_token', data.access_token);

      navigate('/dashboard');


    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
     
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
       
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="relative w-10 h-10">
                <div>
                  <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  </svg>
                </div>
            </div>
            <span className="text-4xl font-bold text-gray-900 ">FINVO</span>
          </div>


          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Content de vous revoir !
          </h1>
          <h2 className="text-gray-600 text-lg mb-8 font-medium">
            Connectez-vous à votre compte
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">⚠️ {error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>


            <div className="border-t border-gray-900 mt-8 pt-6"></div>
           
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
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
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {isLoading ? "Connexion..." : "Se connecter"}
              </button>


              <span className="ml-4 text-sm text-gray-400">
                  <a href="#" className="hover:text-teal-500 transition">Mot de passe oublié ?</a>
              </span>
            </div>


             <div className="border-t border-gray-500 mt-8 pt-6"></div>


             <span className="ml-4 text-sm text-gray-400 inline-block">
                 <p>Pas encore de compte ?</p>
             </span>


             <span className="ml-4 text-sm text-gray-400">
                 <a href="/inscription" className="text-teal-500">Ouvrez un compte</a>
             </span>
          </form>


        </div>
      </div>


      <div className="hidden md:block md:w-1/2 relative bg-teal-900">
        <img
            src={sideIllustration}
            alt="Illustration Finance"
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 "></div>
      </div>


    </div>
  );
};


export default LoginForm;



