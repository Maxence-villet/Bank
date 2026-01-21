import { useState } from 'react';
import Catcher from './icons/catcher';
import TransactionPagination from './transactionPagination';

const TransactionFilter = () => {
  // L'état qui gère l'onglet actuellement sélectionné
  const [activeTab, setActiveTab] = useState<'transactions' | 'recettes' | 'depenses'>('transactions');

  const buttons = [
    { name: 'Transactions', key: 'transactions' },
    { name: 'Recettes', key: 'recettes' },
    { name: 'Dépenses', key: 'depenses' },
  ];
  
  // NOTE: Le style pour la longue barre grise a été déplacé sur le conteneur des boutons
  return (
    <div className='w-full '>
      <div className="relative bg-white rounded-[16px] pl-[24px] pr-[24px]">
        
        {/* La longue barre grise (border-b) est appliquée au conteneur flex */}
        <div className="flex flex-row space-x-4 border-b border-gray-300"> 
          {buttons.map((button) => (
            <button 
              key={button.key}
              // J'ai retiré 'rounded-md' des boutons pour un look plus "onglet"
              className={`flex items-center gap-2 py-2 px-4 text-center text-lg font-medium relative group
                          ${activeTab === button.key ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(button.key as 'transactions' | 'recettes' | 'depenses')}
            >
              <Catcher />
              {button.name}
              
              {/* La barre indicatrice noire :
                  - La position '-bottom-[1px]' la fait chevaucher la bordure grise de 1px.
                  - J'ai ajouté 'z-10' pour s'assurer qu'elle est au-dessus de la bordure grise. */}
              <span
                className={`absolute -bottom-[1px] left-0 right-0 h-[2px] bg-black transition-all duration-300 ease-in-out z-10
                            ${activeTab === button.key ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}
              ></span>
            </button>
          ))}
        </div>
      </div>
      
      {/* 
        Le rendu conditionnel est géré en passant simplement le 'activeTab' actuel à la prop 'filter'
        de TransactionPagination. Cela dit au composant enfant quelle donnée filtrée afficher.
      */}
      <TransactionPagination filter={activeTab} />
    </div>
  );
};

export default TransactionFilter;