import { useRef } from 'react'; 
import html2pdf from 'html2pdf.js'; 
import PdfContent from './pdfContent'; // Assurez-vous d'avoir ce fichier 

interface CardData { 
 title: string; 
 subtitle: string; 
 price: number; 
 isGain: boolean; 
 date: string; 
 status: string; 
} 

const cards: CardData[] = [ 
 { title: "Achat PayPal", subtitle: "Virement", price: 0, isGain: false, date: "26/11/2025", status: "en cours" }, 
 { title: "Netflix", subtitle: "Abonnement", price: 12.99, isGain: false, date: "25/11/2025", status: "terminé" }, 
 { title: "Amazon", subtitle: "Commande", price: 42.5, isGain: true, date: "25/11/2025", status: "terminé" }, 
 { title: "Électricité", subtitle: "Facture", price: 89.3, isGain: true, date: "24/11/2025", status: "terminé" }, 
 { title: "Spotify", subtitle: "Abonnement", price: 9.99, isGain: false, date: "26/11/2025", status: "en cours" }, 
 { title: "Loyer", subtitle: "Paiement", price: 750, isGain: false, date: "23/11/2025", status: "terminé" }, 
 { title: "Salaire", subtitle: "Virement", price: 2100, isGain: true, date: "22/11/2025", status: "terminé" }, 
]; 

const ButtonDownload = () => { 
 const contentRef = useRef<HTMLDivElement>(null); 

 const handleDownloadPdf = () => { 
 if (contentRef.current) { 
 html2pdf().from(contentRef.current).save('releve_transactions.pdf'); 
 } 
 }; 

 return ( 
 <>  
 <div style={{ position: 'absolute', left: '-9999px' }}> 
 <div ref={contentRef}> 
 <PdfContent cards={cards} /> 
 </div> 
 </div> 

 <button 
 style={{ borderWidth: '3px' }} 
 className="flex items-center justify-center gap-2 px-4 py-4 -[6px] border-[#002222] text-[#002222] font-bold rounded-[6px] text-[18px] h-[56px] leading-[133%]" 
 onClick={handleDownloadPdf} 
 > 
 Télécharger un relevé 
 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> 
 <path d="M11 1C11 0.447715 10.5523 0 10 0C9.44771 0 9 0.447715 9 1V10.5858L5.70711 7.29289C5.31658 6.90237 4.68342 6.90237 4.29289 7.29289C3.90237 7.68342 3.90237 8.31658 4.29289 8.70711L9.29289 13.7071C9.68342 14.0976 10.3166 14.0976 10.7071 13.7071L15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289C15.3166 6.90237 14.6834 6.90237 14.2929 7.29289L11 10.5858V1Z" fill="#002222" /> 
 <path d="M1 12C1.55228 12 2 12.4477 2 13V17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H17C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V13C18 12.4477 18.4477 12 19 12C19.5523 12 20 12.4477 20 13V17C20 17.7957 19.6839 18.5587 19.1213 19.1213C18.5587 19.6839 17.7957 20 17 20H3C2.20435 20 1.44129 19.6839 0.87868 19.1213C0.31607 18.5587 0 17.7957 0 17V13C0 12.4477 0.447715 12 1 12Z" fill="#002222" /> 
 </svg> 
 </button> 
 </> 
 ); 
}; 

export default ButtonDownload;