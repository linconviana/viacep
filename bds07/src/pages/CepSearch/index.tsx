import './styles.css';

import ResultCard from 'components/ResultCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//criar os tipos de dados do objeto
type FormData = {
  cep: string;
};

//criar os tipos de dados do objeto
type Address = {
  logradouro: string;
  localidade: string;
};

const CepSearch = () => {
  const [formData, setFormData] = useState<FormData>({
    cep: '',
  });

  const [address, setAddress] = useState<Address>();

  const handleChange = (event: any) => {
    //console.log('digitou ' + event.target.value);

    //pegar name e valor dos input do formulario
    const name = event.target.name;
    const value = event.target.value;

    //trocar pela informação digitada no formulario
    setFormData({ ...formData, [name]: value });
  };

  const HandleSubimit = (event: any) => {
    
    event.preventDefault();

    let cep = formData.cep.trim();

    let status1 = formData.cep.indexOf('.') > -1;
    let statu2 = formData.cep.includes('-');
    let status = (formData.cep.indexOf('.') || formData.cep.indexOf('-')) > -1;

    if (status) cep = formData.cep.replace('.', '').replace('-', '').trim();

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    debugger;

    axios
      .get(url)
      .then((response) => {
        debugger;
        if (response.statusText === 'OK') setAddress(response.data);
        else alert('cep invalido');
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      });

    /*useEffect(() => {

      let cep = formData.cep.trim();

    let status1 = formData.cep.indexOf('.') > -1;
    let statu2 = formData.cep.includes('-');
    let status = (formData.cep.indexOf('.') || formData.cep.indexOf('-')) > -1;

    if (status) cep = formData.cep.replace('.', '').replace('-', '').trim();

    const url = `https://viacep.com.br/ws/${cep}/json/`;
      axios
        .get(url)
        .then((response) => {
          debugger;
          if (response.statusText === 'OK') setAddress(response.data);
          else alert('cep invalido');
        })
        .catch((error) => {
          setAddress(undefined);
          console.log(error);
        });
    }, []);*/

  };

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={HandleSubimit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              value={formData.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>

        {address && (
          <>
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Localidade" description={address.localidade} />
          </>
        )}
      </div>
    </div>
  );
};

export default CepSearch;
