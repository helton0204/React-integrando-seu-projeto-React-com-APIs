import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');

  useEffect(() => {
    //obter restaurantes
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/') //<IPaginacao<IRestaurante>> está tipando a requisição get
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next); //vai passar o endereço da próxima página
      })
  }, []); //o useEfect dispara uma função sempre que uma dependência (segundo parâmetro) for modificada, quando não existe nenhuma depedência a função é disparada apenas uma vez quando o componente em questão for renderizado

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then(resposta => {
        setRestaurantes([...restaurantes, ...resposta.data.results]) //aqui está pegando os dados de restaurantes e concatenando com os dados da nova requisição
        setProximaPagina(resposta.data.next); 
      })
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(restaurante => <Restaurante restaurante={restaurante} key={restaurante.id} />)}
      {proximaPagina ? <button onClick={verMais}>ver mais</button> : ''} 
    </section>)
}

export default ListaRestaurantes