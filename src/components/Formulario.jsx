import React, {useState} from "react";
import Error from "./Error"
const Formulario = ({setBusqueda, setBuscar}) => {

const [termino, setTermino] = useState('');
const [error, setError] = useState(false);
  const onSubmit = (e) => {
      e.preventDefault();
      if(termino === '')
      {
          setError(true);
          return;
      }
      setError(false);
      setBusqueda(termino);
      setBuscar(true);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: gatitos"
            onChange={e => setTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error mensaje = 'especificar filtro' /> : null}
    </form>
  );
};

export default Formulario;
