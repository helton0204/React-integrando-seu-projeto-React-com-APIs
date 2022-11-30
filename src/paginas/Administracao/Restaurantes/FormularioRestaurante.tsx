import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http"; 
import IRestaurante from "../../../interfaces/IRestaurante";

function FormularioRestaurante(){
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    const parametros = useParams(); //obtém o valor que é dinâmico de uma url (path). Nesse caso vai pegar o id de "/admin/restaurantes/:id"

    useEffect(() => { 
        if(parametros.id){
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`) //http é uma instância do axios e está na pasta http do projeto
                .then(resposta => setNomeRestaurante(resposta.data.nome));
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if(parametros.id){
            http.put(`restaurantes/${parametros.id}/`, {nome: nomeRestaurante}) //a requisição do tipo put faz uma atualização nos dados da api. O segundo parâmetro do método put é o que vai ser modificado para a api
                .then(() => {
                    alert("Restaurante atualizado com sucesso!");
                });
        }
        else{
            http.post('restaurantes/', {nome: nomeRestaurante}) //o segundo parâmetro do método post é o que vai ser enviado para a api
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!");
                });
        }
    }

    return(
        <Container maxWidth="lg" sx={{mt:1}}>
            <Paper sx={{p: 2}}>
                {/*Conteúdo da página*/}
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: "center", flexGrow: 1}}>
                    <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                    <Box component="form" onSubmit={aoSubmeterForm} sx={{width: "100%"}}>
                        <TextField 
                            label="Nome do restaurante"
                            value={nomeRestaurante} 
                            onChange={evento => setNomeRestaurante(evento.target.value)} 
                            variant="standard" 
                            required
                            fullWidth
                        />
                        <Button type="submit" sx={{marginTop: 1}} fullWidth variant="outlined">Salvar</Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
export default FormularioRestaurante;