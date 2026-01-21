import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import Step1 from '../../components/Virements/Step1';
import Step2Externe from '../../components/Virements/Externe/Step2';
import Step3Externe from '../../components/Virements/Externe/Step3';
import Step4Externe from '../../components/Virements/Externe/Step4';
import Step2Interne from '../../components/Virements/Interne/Step2';
import TransferConfirmation from '../../components/Virements/Shared/TransferConfirmation';
import type { Account } from '../../types/account';

type TransferType = 'internal' | 'external';

interface TransferData {
  debitAccountId: string;
  creditAccountId: string;
  amount: number;
  label: string;
}

interface TransactionDetails {
  uuid: string;
  debitId: string;
  creditId: string;
  amount: number;
  label: string;
}

interface ProgressToastProps {
  onCancel: () => void;
  onDismiss: () => void;
}

const ProgressToast: React.FC<ProgressToastProps> = ({ onCancel, onDismiss }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / 5000 * 50); // Decrease over 5s (100ms steps would be too fast, but 50ms fine)
        if (newProgress <= 0) {
          onDismiss();
          return 0;
        }
        return newProgress;
      });
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [onDismiss]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Virement initié</h3>
          <p className="text-sm text-gray-600">Annulez dans 5 secondes si erreur.</p>
        </div>
        <button
          onClick={() => {
            onCancel();
            onDismiss();
          }}
          className="ml-2 px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
          disabled={false} // No pending state here, handled in parent
        >
          Annuler
        </button>
      </div>
      <div className="w-full bg-orange-200 rounded-full h-2 mt-2 overflow-hidden">
        <div 
          className="bg-orange-500 h-2 rounded-full transition-all duration-50 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

function VirementPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [transferType, setTransferType] = useState<TransferType>('internal');
    const [transferData, setTransferData] = useState<TransferData>({
      debitAccountId: '',
      creditAccountId: '',
      amount: 0,
      label: ''
    });
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails>({
      uuid: '',
      debitId: '',
      creditId: '',
      amount: 0,
      label: ''
    });

    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: accounts = [] } = useQuery<Account[]>({
      queryKey: ['accounts'],
      queryFn: async () => {
        if (!token) throw new Error('No token');
        const response = await fetch('http://localhost:8000/accounts/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        return response.json();
      },
      enabled: !!token,
    });

    const createMutation = useMutation({
      mutationFn: async (data: { sender_id: string; receiver_id: string; amount: number; description: string }) => {
        const response = await fetch('http://localhost:8000/transaction/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      },
    });

    const cancelMutation = useMutation({
      mutationFn: async (uuid: string) => {
        const response = await fetch(`http://localhost:8000/transaction/cancel/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      },
      onSuccess: () => {
        toast.success('Virement annulé avec succès');
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        setTransactionDetails({ uuid: '', debitId: '', creditId: '', amount: 0, label: '' });
      },
    });

    const generatePdf = () => {
      if (!transactionDetails.uuid) {
        toast.error('Aucune transaction disponible pour le reçu.');
        return;
      }

      const doc = new jsPDF();
      const date = new Date().toLocaleDateString('fr-FR');
      const fromAccount = accounts.find(a => a.id === transactionDetails.debitId);
      const toAccount = accounts.find(a => a.id === transactionDetails.creditId);
      
      let fromName = 'Compte expéditeur';
      if (fromAccount) {
        fromName = fromAccount.name || (fromAccount.id.startsWith('C') ? 'compte courant' : `Compte se terminant par ${fromAccount.iban.slice(-4)}`);
      }

      let toName = 'Compte destinataire';
      if (toAccount) {
        toName = toAccount.name || (toAccount.id.startsWith('C') ? 'compte courant' : `Compte se terminant par ${toAccount.iban.slice(-4)}`);
      }

      doc.setFontSize(20);
      doc.text('Reçu de Virement', 105, 30, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text(`Date: ${date}`, 20, 50);
      doc.text(`ID Transaction: ${transactionDetails.uuid}`, 20, 60);
      doc.text(`De: ${fromName}`, 20, 80);
      if (fromAccount) {
        doc.text(`IBAN: ${fromAccount.iban}`, 20, 90);
      }
      doc.text(`Vers: ${toName}`, 20, 100);
      if (toAccount) {
        doc.text(`IBAN: ${toAccount.iban}`, 20, 110);
      }
      doc.text(`Montant: ${transactionDetails.amount.toFixed(2)} €`, 20, 120);
      if (transactionDetails.label) {
        doc.text(`Libellé: ${transactionDetails.label}`, 20, 130);
      }

      doc.save('recu_virement.pdf');
    };

    const sendTransfer = () => {
      if (transferData.amount <= 0 || !transferData.debitAccountId || !transferData.creditAccountId) return;
      
      const mutateData = {
        sender_id: transferData.debitAccountId,
        receiver_id: transferData.creditAccountId,
        amount: Math.round(transferData.amount * 100),
        description: transferData.label,
      };

      createMutation.mutate(mutateData, {
        onSuccess: (response) => {
          const uuid = response.message.uuid_transaction;
          setTransactionDetails({
            uuid,
            debitId: transferData.debitAccountId,
            creditId: transferData.creditAccountId,
            amount: transferData.amount,
            label: transferData.label
          });
          toast.custom(
            (t) => (
              <ProgressToast 
                onCancel={() => cancelMutation.mutate(uuid)} 
                onDismiss={() => toast.dismiss(t.id)} 
              />
            ),
            { duration: 5000, position: 'bottom-left' }
          );

          queryClient.invalidateQueries({ queryKey: ['accounts'] });
          setCurrentStep(3); // Go to success step
        },
        onError: (error) => {
          toast.error(`Erreur: ${error.message}`);
        },
      });
    };

    const handleNext = () => {
        if (transferType === 'internal') {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleTransferTypeSelect = (type: TransferType) => {
        setTransferType(type);
    };

    const updateTransferData = (data: Partial<TransferData>) => {
      setTransferData(prev => ({ ...prev, ...data }));
    };

    const renderCurrentStep = () => {
        if (currentStep === 1) {
            return (
                <Step1
                    selectedTransferType={transferType}
                    onTransferTypeSelect={handleTransferTypeSelect}
                    onNext={handleNext}
                />
            );
        }

        if (transferType === 'internal') {
            switch (currentStep) {
                case 2:
                    return (
                        <Step2Interne
                            accounts={accounts}
                            debitAccountId={transferData.debitAccountId}
                            onDebitAccountChange={(id) => updateTransferData({ debitAccountId: id })}
                            creditAccountId={transferData.creditAccountId}
                            onCreditAccountChange={(id) => updateTransferData({ creditAccountId: id })}
                            amount={transferData.amount}
                            onAmountChange={(amt) => updateTransferData({ amount: amt })}
                            label={transferData.label}
                            onLabelChange={(lbl) => updateTransferData({ label: lbl })}
                            onNext={sendTransfer}
                            onPrevious={handlePrevious}
                        />
                    );
                case 3:
                    const creditAccount = accounts.find(a => a.id === transferData.creditAccountId);
                    const transferAmount = transferData.amount.toFixed(2);
                    let beneficiaryName = 'Compte interne';
                    if (creditAccount) {
                      beneficiaryName = creditAccount.name || (creditAccount.id.startsWith('C') ? 'compte courant' : `Compte se terminant par ${creditAccount.iban.slice(-4)}`);
                    }
                    const steps = [
                      { number: 1, title: "Type de virement", isActive: true },
                      { number: 2, title: "Choisir un compte", isActive: true },
                      { number: 3, title: "Confirmation", isActive: true }
                    ];
                    return (
                        <TransferConfirmation
                            transferAmount={transferAmount}
                            beneficiaryName={beneficiaryName}
                            steps={steps}
                            useCircleIcon={false}
                            onNewTransfer={() => { 
                              setCurrentStep(1); 
                              setTransferData({ debitAccountId: '', creditAccountId: '', amount: 0, label: '' });
                              setTransactionDetails({ uuid: '', debitId: '', creditId: '', amount: 0, label: '' });
                            }}
                            onDownload={generatePdf}
                        />
                    );
                default:
                    return null;
            }
        } else {
            // External steps remain unchanged for now
            switch (currentStep) {
                case 2:
                    return (
                        <Step2Externe
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                        />
                    );
                case 3:
                    return (
                        <Step3Externe
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                        />
                    );
                case 4:
                    return (
                        <Step4Externe
                            onPrevious={handlePrevious}
                        />
                    );
                default:
                    return null;
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F7FCFC]">
            {renderCurrentStep()}
        </div>
    );
}

export default VirementPage;