import CloseAccount from "./CloseAccount"

interface AccountType {
    id: number,
    name: string,
    amount: number,
    iban: string,
}

function Account(account: AccountType) {
    return (
        <>
            <div className="text-left flex flex-col gap-4 background-white border-0 rounded-2xl p-6 bg-white max-w-md">
                <h2 className="text-xl">{account.name}</h2>
                <div className="flex flex-column justify-between">
                    <p className="font-bold">{account.amount}€</p>
                    <p className="text-gray-400">{account.iban}...</p>
                </div>
                <div className="font-bold flex flex-row gap-4">
                    <button className="border-2 rounded-md px-3 py-2">Transactions</button>
                    <CloseAccount id={account.id}/>
                </div>
            </div>
        </>
    );
}

export default Account;