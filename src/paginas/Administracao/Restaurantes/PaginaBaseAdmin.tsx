import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from "@mui/material";
import {Link as RouterLInk, Outlet} from "react-router-dom";

function PaginaBaseAdmin(){
    return(
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" sx={{mr: 7, color: "yellow"}}>
                            Administração
                        </Typography>
                        <Box sx={{display: "flex", flexGrow: 1}}>
                            <Link component={RouterLInk} to="/admin/restaurantes">
                                <Button sx={{my: 2, color: "white"}}>
                                    Restaurantes
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{display: "flex", flexGrow: 1}}>
                            <Link component={RouterLInk} to="/admin/restaurantes/novo">
                                <Button sx={{my: 2, color: "white"}}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{display: "flex", flexGrow: 1}}>
                            <Link component={RouterLInk} to="/admin/pratos">
                                <Button sx={{my: 2, color: "white"}}>
                                    Pratos
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{display: "flex", flexGrow: 1}}>
                            <Link component={RouterLInk} to="/admin/pratos/novo">
                                <Button sx={{my: 2, color: "white"}}>
                                    Novo Prato
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{mt:1}}>
                    <Paper sx={{p: 2}}>
                       <Outlet/> {/*O conteúdo das rotas filhas é renderizado aqui*/}
                    </Paper>
                </Container>
            </Box>
        </>
    )
}
export default PaginaBaseAdmin;