import sideIllustration from '../../assets/side-illustration.png'; 

function LoginForm() {
  return (

    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-y-auto">
        
        <div className="w-full max-w-md mx-auto">

          <div className="flex items-center gap-3 mb-12">
            <div className="relative w-10 h-10">
                 <div>
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
                 
            </div>
            <span className="text-4xl font-bold text-gray-900 ">FINVO</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Content de vous revoir !
          </h1>
          <h2 className="text-gray-600 text-lg mb-8 font-medium">
            Connectez-vous à votre compte
          </h2>

          <form className="space-y-6">

            <div className="border-t border-gray-900 mt-8 pt-6"></div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <input 
                type="password" 
                id="password"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-900"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-md transition duration-300 w-auto inline-block"
              >
                Se connecter
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
                  <a href="#" className="text-teal-500">Ouvrez un compte</a>
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
        <div className="absolute inset-0 bg-teal-900 opacity-20 mix-blend-multiply"></div>
      </div>

    </div>
  );
};

export default LoginForm;