import { toast } from "react-toastify";
import { useCreateSimulationMutation } from "../../../../slices/simulationsApiSlice";
import Loader from "../../../../components/shared/Loader";

const Step1 = ({ onNext }) => {
    const [createSimulation, { data: simulationData, isLoading, refetch }] = useCreateSimulationMutation();  // Ajoutez des parenthèses ici
  
    const createInstallationHandler = async () => {
        if (window.confirm("Voulez-vous créer une nouvelle simulation ?")) {
            try {
                const result = await createSimulation();
                console.log("Résultat complet:", result);
                console.log("Data:", result.data);
                const installationId = result.data?._id;  // Accédez aux données ici

                if (installationId) {
                    toast.success("Simulation créée avec succès");
                    onNext(installationId);  // Passez l'ID de simulation à la fonction de rappel onNext
                }
            } catch (error) {
                console.log("Erreur complète:", error);
                toast.error(error?.data?.message || error?.message);
            }
        }
    };

    return (
        <div className="heading">
            {isLoading && <Loader />}
            <h1>Création d'une simulation</h1>
            <p>Assistant de création d'une simulation d'installation.</p>
            <button
                className="btn btn-lg btn-primary"
                onClick={createInstallationHandler}
            >
                Commencer
            </button>
        </div>
    );
};

export default Step1;
