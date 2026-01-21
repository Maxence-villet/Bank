import ModifyMail from "../../components/Profil/ModifyMail";
import ModiFyProfile from "../../components/Profil/ModifyPassword";

function ProfilPage() {
    return (
        <>
        <div className="pr-7 pl-16">
            <div className="flex flex-row justify-between items-center mb-12">
                <div className="text-left flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">Profil</h1>
                </div>
            </div>
            <div className="flex flex-col gap-8 md:flex-row">
                <ModiFyProfile />
                <ModifyMail />
            </div>
        </div>
        </>
    )
}

export default ProfilPage;