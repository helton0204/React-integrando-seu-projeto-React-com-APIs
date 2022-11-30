import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";
import http from "../../../http/index";

function FormularioPrato(){
    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState('');
    const [imagem, setImagem] = useState<File | null>(null)

    useEffect(() => {
        axios.get<{tags: ITag[]}>("http://localhost:8000/api/v2/tags/") //a resposta obtida é um objeto que tem a propriedade chamada tags que recebe um array {tags: ITag[]}
            .then(resposta => setTags(resposta.data.tags));
        http.get<IRestaurante[]>("restaurantes/").
            then(resposta => setRestaurantes(resposta.data));
    }, [])
    
    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData(); //os dados da classe formData será enviada para o backend através do http.request

        formData.append("nome", nomePrato); //incluir um campo chamado nome e o nome do prato é o valor para esse campo
        formData.append("descricao", descricao);
        formData.append("tag", tag);
        formData.append("restaurante", restaurante);
        
        if(imagem){
            formData.append("imagem", imagem);
        }

        http.request({ //request é faz uma soliticação para o backend, nesse caso será enviado um formulário, para tal, ele recebe um objeto de configuração
            url: 'pratos/', //esse é o caminho dessa solicitação
            method: "POST", //o tipo de método dessa solicitação
            headers: {"Content-Type": "multpart/form-data"}, //"multpart/form-data" é o tipo de conteúdo dessa solicitação
            data: formData //formData são os dados enviados para essa solicitação
        })
            .then(() => {
                setNomePrato("");
                setDescricao("");
                setTag("");
                setRestaurante("");
                alert("Prato cadastrado com sucesso!");
            }) 
            .catch(erro => console.log(erro));
    }

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if(evento.target.files?.length){ //se o array evento.target.files existir
            setImagem(evento.target.files[0]);
        }
        else{
            setImagem(null);
        }
    }

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: "center", flexGrow: 1}}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component="form" onSubmit={aoSubmeterForm} sx={{width: "100%"}}>
                <TextField 
                    label="Nome do prato"
                    value={nomePrato} 
                    onChange={evento => setNomePrato(evento.target.value)} 
                    variant="standard" 
                    required
                    fullWidth
                    margin="dense"
                />

                <TextField 
                    label="Descrição do prato"
                    value={descricao} 
                    onChange={evento => setDescricao(evento.target.value)} 
                    variant="standard" 
                    required
                    fullWidth
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map(tag => (
                            <MenuItem  key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>))
                        }
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map(restaurante => (
                            <MenuItem  key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>))
                        }
                    </Select>
                </FormControl>

                <input type="file" onChange={evento => selecionarArquivo(evento)}/> {/*o evento do html é sempre uma lista (array) quando o input é do tipo arquivo */}

                <Button type="submit" sx={{marginTop: 1}} fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}
export default FormularioPrato;