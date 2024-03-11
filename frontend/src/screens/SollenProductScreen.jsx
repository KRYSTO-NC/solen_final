import React, { useState } from 'react'
import { useGetProductsQuery } from '../slices/dolibarr/dolliProductApiSlice';
import {Row } from 'react-bootstrap';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';


const SollenProductScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('22'); // État pour stocker la catégorie sélectionnée
    const { data, isLoading, error, refetch } = useGetProductsQuery(selectedCategory);
   
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value); // Mettre à jour la catégorie sélectionnée lors du changement dans le menu déroulant
    };

    console.log('====================================');
    console.log(data);
    console.log('====================================');
  return (
    <Row>
    <h1>Produits Solen</h1>

        {/* Menu déroulant pour filtrer les catégories */}
        <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="22">Batteries</option>
        <option value="17">Module PV </option>
        <option value="21">Onduleurs</option>
        <option value="20">Prestation</option>
        <option value="19">Supervision</option>
        <option value="5">Supportage</option>
        
        {/* Ajouter d'autres options selon vos besoins */}
      </select>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">
        {typeof error.data.message === 'string'
          ? error.data.message
          : 'Une erreur est survenue'}
      </Message>
    ) : (
      <>
      
    
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Refference</th>
              <th>Nom</th>
              <th>Prix public</th>
              <th>Prix prof</th>
              <th>Prix revendeur</th>
              <th>En stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => {
              // Ajoutez une condition pour filtrer les produits
              if (product) {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.ref}</td>
                    <td>{product.label}</td>
                    
                    <td>{Math.round(product.multiprices?.["1"] ?? "0")} XPF</td>
                      <td>{Math.round(product.multiprices?.["2"] ?? "0")} XPF</td>
                      <td>{Math.round(product.multiprices?.["3"] ?? "0")} XPF</td>
                    <td>
                      {product.stock_reel != null
                        ? typeof product.stock_reel === 'number'
                          ? product.stock_reel.toFixed(2)
                          : typeof product.stock_reel === 'string'
                          ? parseFloat(product.stock_reel).toFixed(2)
                          : product.stock_reel
                        : '0'}
                    </td>
                    {/* <td>
                      <LinkContainer to={`/produit/${product.id}`}>
                        <Button variant="success" className="btn-sm mx-2">
                          <FaEye />
                        </Button>
                      </LinkContainer>
                    </td> */}
                  </tr>
                )
              } else {
                // Retournez null si le produit ne correspond pas au critère
                return null
              }
            })}
          </tbody>
        </table>
      
      </>
    )}
  </Row>
  )
}

export default SollenProductScreen