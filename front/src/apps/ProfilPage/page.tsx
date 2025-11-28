import ModiFyProfile from "../../components/Profil/ModifyProfile";

function ProfilPage() {
    return (
        <>
        <div className="pr-7 pl-16">
            <div className="flex flex-row justify-between items-center mb-12">
                <div className="text-left flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">Profil</h1>
                </div>
            </div>
            <ModiFyProfile />
        </div>
        </>
    )
}

export default ProfilPage;