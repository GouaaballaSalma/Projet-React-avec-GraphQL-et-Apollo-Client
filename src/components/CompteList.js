import React from "react";
import { useQuery } from '@apollo/client';
import { GET_ALL_COMPTES } from "../graphql/queries";

// Le composant utilise useQuery pour récupérer la liste de tous les comptes
const CompteList = () => {
  // Exécute la requête GraphQL
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);
  
  if (loading) return <p className="p-4 text-center text-blue-600">Chargement des comptes...</p>;
  if (error) return <p className="p-4 text-center text-red-600">Erreur : {error.message}</p>;
  
  // Affiche un message si la liste est vide
  if (!data || !data.allComptes || data.allComptes.length === 0) {
    return <p className="p-4 text-center text-gray-500">Aucun compte trouvé.</p>;
  }
  
  return (
    <div className="p-4 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">Liste des Comptes</h2>
      <div className="space-y-4">
        {data.allComptes.map((compte) => (
          <div key={compte.id} className="p-4 border rounded-lg hover:bg-gray-50 transition duration-150">
            <p className="font-semibold text-lg text-blue-700">ID: {compte.id}</p>
            <p className="text-gray-900">Solde: <span className="font-mono font-bold">{compte.solde} €</span></p>
            <p className="text-sm text-gray-600">Date de création: {new Date(compte.dateCreation).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Type: <span className="font-medium text-purple-700">{compte.type}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompteList;