import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AddBeneficiary from "../../components/Beneficiary/AddBeneficiary";
import AllBeneficiary from "../../components/Beneficiary/AllBeneficiary";

interface BeneficiaryType {
    id: string;
    name: string;
    iban: string;
}

function Beneficiary() {
    const { token } = useAuth();
    const [beneficiaries, setBeneficiaries] = useState<BeneficiaryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBeneficiaries = async () => {
        if (!token) {
            setError("No authentication token");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await fetch("http://localhost:8000/beneficiaries/user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const mappedBeneficiaries = data.map((b: any) => ({
                id: b.id,
                name: `${b.first_name} ${b.last_name}`,
                iban: b.iban,
            }));
            setBeneficiaries(mappedBeneficiaries);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch beneficiaries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBeneficiaries();
    }, [token]);

    if (loading) return <div>Loading beneficiaries...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="pr-7 pl-16">
            <div className="flex flex-row justify-between items-center mb-12">
                <div className="text-left flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">Mes beneficiaires</h1>
                    <div className="text-xl flex flex-column gap-1 text-gray-400">
                        <p>Nombre de bénéficiaires:</p>
                        <h3 className="font-bold">{beneficiaries.length}</h3>   
                    </div>
                </div>
                <AddBeneficiary onAdd={fetchBeneficiaries} />
            </div>
            <AllBeneficiary beneficiaries={beneficiaries} onDelete={fetchBeneficiaries} />
        </div>
    );
}

export default Beneficiary;