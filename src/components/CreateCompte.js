import React, { useState } from 'react';
// Correction de l'import : Seul useMutation est strictement nécessaire ici.
import { useMutation } from '@apollo/client'; 
import { SAVE_COMPTE } from '../graphql/mutations';
import { TypeCompte } from '../graphql/types'; // Importe les types pour les options du select

// Le composant utilise useMutation pour créer un nouveau compte
const CreateCompte = () => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState(TypeCompte.COURANT); // Utilisation de TypeCompte.COURANT

  // useMutation hook pour exécuter la mutation SAVE_COMPTE
  const [saveCompte, { loading, error }] = useMutation(SAVE_COMPTE, {
    // Optionnel : Mettre à jour le cache ou refetcher les requêtes après une mutation réussie
    // Vous auriez besoin d'importer GET_ALL_COMPTES pour décommenter cette ligne.
    // refetchQueries: [{ query: GET_ALL_COMPTES }], 
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!solde) return; // Empêche l'envoi si le solde est vide
    
    try {
      // Exécute la mutation en passant les variables CompteRequest
      await saveCompte({
        variables: {
          compte: {
            solde: parseFloat(solde),
            type,
          },
        },
      });
      // Réinitialisation du formulaire après succès
      setSolde('');
      setType(TypeCompte.COURANT);

      console.log('Compte créé avec succès !');

    } catch (err) {
      console.error('Erreur lors de la création du compte :', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-xl rounded-xl space-y-4">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">Créer un Nouveau Compte</h2>
      
      {loading && <p className="text-blue-500">En cours de création...</p>}
      {error && <p className="text-red-600">Erreur : {error.message}</p>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="solde">
          Solde initial (€) :
        </label>
        <input
          type="number"
          id="solde"
          value={solde}
          onChange={(e) => setSolde(e.target.value)}
          required
          placeholder="Entrez le solde initial"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-shadow"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">
          Type de compte :
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition-shadow"
        >
          {/* Utilise les énumérations importées pour les options */}
          <option value={TypeCompte.COURANT}>Courant</option>
          <option value={TypeCompte.EPARGNE}>Épargne</option>
        </select>
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
      >
        {loading ? 'Création...' : 'Créer un compte'}
      </button>
    </form>
  );
};

export default CreateCompte;