import { Routes, Route } from 'react-router-dom';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/Restaurantes/PaginaBaseAdmin';
import Home from './paginas/Home/index';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes/>} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante/>} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante/>} /> {/*os dois pontos no caminho :id indica que esse caminho é dinâmico */}
        <Route path='pratos' element={<AdministracaoPratos/>}/>
        <Route path='pratos/novo' element={<FormularioPrato/>}/>
        <Route path='pratos/:id' element={<FormularioPrato/>}/>
      </Route>
    </Routes>
  );
}

export default App;
