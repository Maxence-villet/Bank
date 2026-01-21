import React from 'react'; 

interface CardData { 
 title: string; 
 subtitle: string; 
 price: number; 
 isGain: boolean; 
 date: string; 
 status: string; 
} 

interface PdfContentProps { 
 cards: CardData[]; 
} 

const PdfContent: React.FC<PdfContentProps> = ({ cards }) => { 
 return ( 
 <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}> 
 <h1>Relevé de Transactions</h1> 
 <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}> 
 <thead> 
 <tr style={{ backgroundColor: '#f2f2f2' }}> 
 <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Titre</th> 
 <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Sous-titre</th> 
 <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Prix</th> 
 <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Type</th> 
 <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th> 
 <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Statut</th> 
 </tr> 
 </thead> 
 <tbody> 
 {cards.map((card, index) => ( 
 <tr key={index}> 
 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{card.title}</td> 
 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{card.subtitle}</td> 
 <td style={{ border: '1px solid #ddd', padding: '8px', color: card.isGain ? 'green' : 'red' }}> 
 {card.isGain ? '+' : '-'} {card.price.toFixed(2)}€ 
 </td> 
 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{card.isGain ? 'Revenu' : 'Dépense'}</td> 
 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{card.date}</td> 
 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{card.status}</td> 
 </tr> 
 ))} 
 </tbody> 
 </table> 
 </div> 
 ); 
}; 

export default PdfContent;