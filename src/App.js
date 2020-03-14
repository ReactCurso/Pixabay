import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";
import axios from "axios";
function App() {
  const [busqueda, setBusqueda] = useState("");
  const [buscar, setBuscar] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  useEffect(() => {
    if (!buscar) return;
    const consultarApi = async () => {
      const imagenesPorPagina = 32;
      const apiKey = '15601296-ae4141e602e17550c31b41ffb';
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${busqueda}&image_type=photo&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const resultado = await axios.get(url);
      setImagenes(resultado.data.hits);
      console.log(resultado);
      setTotalPaginas(Math.ceil(resultado.data.totalHits/imagenesPorPagina));
      setBuscar(false);
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});
    };
    consultarApi();
    // eslint-disable-next-line
  }, [buscar]);

  const pagAnterior = () => {
     if(paginaActual === 0) return;
     setPaginaActual(paginaActual-1);
     setBuscar(true);
  }
  const pagSiguiente = () => {
     if(paginaActual >= totalPaginas) return;
     setPaginaActual(paginaActual+1);
     setBuscar(true);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario setBusqueda={setBusqueda} setBuscar={setBuscar} />
      </div>
      <div className = "row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        {paginaActual > 1 ? <button type="button" className="bbtn btn-info mr-1" onClick={pagAnterior}>Anterior &laquo;</button> : null }
        {paginaActual < totalPaginas ? <button type="button" className="bbtn btn-info" onClick={pagSiguiente}>Siguiente &raquo;</button> : null }
      </div>
    </div>
  );
}

export default App;
