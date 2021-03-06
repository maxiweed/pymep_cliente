import React,{Fragment, useState,useEffect} from 'react';
import { Button, Form, Col, Row, Container, Card} from 'react-bootstrap';
import uuid from 'react-uuid';
import RegistroContacto from './RegistroContacto';
import Titulo from '../layout/Titulo';




const RegistroUsuario = (props) => {

    //state para cambiar de formulario
    const [Siguiente, estadoFormulario] = useState(false);

    //agregar state Reguistro Usuario
    const [RegistroUsuario, CambiarStateUsuario] = useState({

        nombre: '',
        segundoNombre:'',
        apellidoMaterno: '',
        apellidoPaterno:'',
        run:'',
        username:'',
        password:''

    })

    //actualizar state Registro Usuario
    const actualizarState = (e) => {
        CambiarStateUsuario({
            ...RegistroUsuario,
            [e.target.name]: e.target.value
        })
    }

    //extraer datos state distrotion
    const { nombre,segundoNombre,apellidoMaterno,apellidoPaterno, run,username, password } = RegistroUsuario;

    //estado para cambiar mensaje de error
     const [mensajeError, estadoMensaje] = useState('');

    //estado para cambiar color mensaje
    const [claseError, estadoClaseMensaje] = useState('');

    //Restablecer form
    const Restablecer = (e) =>{
        CambiarStateUsuario({
            ...RegistroUsuario,
            nombre: '',
            segundoNombre:'',
            apellidomaterno: '',
            apellidoPaterno:'',
            run:''
        })
        estadoMensaje('')
        console.log(e.target.parentElement.parentElement.parentElement[0].focus());
    }

    //agregar usuario a local estorage
    let UsuariosIniciales = JSON.parse(localStorage.getItem('usuarios'));
        if(!UsuariosIniciales){
            UsuariosIniciales=[];
        }

    // Arreglo de usuarios
    const [usuarios, guardarUsuarios] = useState(UsuariosIniciales);

     
    useEffect( () => {
      if(UsuariosIniciales) {
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
      } else {
        localStorage.setItem('usuarios', JSON.stringify([]));
      }
    }, [usuarios] );

     
    //agregar usuario
    const crearUsuario = usuario => {
            guardarUsuarios([ 
                ...usuarios,
                 usuario ]);
        }

    //validar Datos Formilario
    const sutmitRegistroUsuario = (e) =>{

         e.preventDefault();

         if(nombre.trim() ==='' ){
            estadoMensaje('ingrese Nombre');
            estadoClaseMensaje('error');
            e.target[0].focus();
            return;
        }else{
            if(segundoNombre.trim() ==='' ){
                estadoMensaje('ingrese Segundo Nonbre');
                estadoClaseMensaje('error');
                e.target[1].focus();
                return;
            }else{
                if(apellidoMaterno.trim() ==='' ){
                    estadoMensaje('ingrese Apellido Materno');
                    estadoClaseMensaje('error');
                    e.target[2].focus();
                    return;
                }else{
                    if(apellidoPaterno.trim() ==='' ){
                        estadoMensaje('ingrese Apellido Paterno');
                        estadoClaseMensaje('error');
                        e.target[3].focus();
                        return;
                    }else{
                        if(run.trim() ==='' ){
                            estadoMensaje('ingrese Ingrese Rut');
                            estadoClaseMensaje('error');
                            e.target[4].focus();
                            return;
                        }else{
                            if(username.trim() ==='' ){
                                estadoMensaje('ingrese Ingrese Username');
                                estadoClaseMensaje('error');
                                e.target[5].focus();
                                return;
                            }else{
                                if(password.trim() ==='' ){
                                    estadoMensaje('ingrese Ingrese Password');
                                    estadoClaseMensaje('error');
                                    e.target[6].focus();
                                    return;
                                }else{
                                    
                                    //estado para pasar al formulario de registro pyme
                                    estadoFormulario(true);
                                    RegistroUsuario.id = uuid();
                                    crearUsuario(RegistroUsuario);
                                }
                            }
                        
                        }        
                    }
                }
            }
        }
    }
    return ( 
       
        <Fragment>
            <Container fluid><br/>
                <Row>
                    <Col xs={12}  lg={2}></Col>
                    <Col xs={12}  lg={8} >
                    {Siguiente? < RegistroContacto/> :                   
                    <Card style={{ width: '100%', padding:'1em' }}>                   
                        <Form onSubmit={sutmitRegistroUsuario}>
                            <Titulo
                                className="text-center"
                                titulo='Reguistro Datos Personales Usuario'
                            /><br/>
                            <Form.Row>
                                <Col xs={12} sm={8} lg={6} >
                                    <Form.Label>Primer Nombre</Form.Label>
                                    <Form.Control 
                                    size="sm"
                                    type="text" 
                                    placeholder=""
                                    name="nombre"
                                    onChange={actualizarState}
                                    value={nombre}
                                    /> 
                                </Col>
                                <Col xs={12} sm={8} lg={6}>
                                    <Form.Label>Segundo Nombre</Form.Label>
                                    <Form.Control 
                                    size="sm" 
                                    type="text" 
                                    placeholder=""
                                    name="segundoNombre"
                                    onChange={actualizarState}
                                    value={segundoNombre}
                                    /> 
                                </Col>
                            </Form.Row>

                            <Form.Row>
                                <Col xs={12} sm={8} lg={6}>
                                <Form.Label>Apellido Materno </Form.Label>
                                    <Form.Control 
                                    size="sm" 
                                    type="text" 
                                    placeholder=""
                                    name="apellidoMaterno"
                                    onChange={actualizarState}
                                    value={apellidoMaterno}
                                    /> 
                                </Col>
                                <Col xs={12} sm={8} lg={6}>
                                <Form.Label>Apellido Paterno</Form.Label>
                                    <Form.Control 
                                    size="sm" 
                                    type="text" 
                                    placeholder=""
                                    name="apellidoPaterno"
                                    onChange={actualizarState}
                                    value={apellidoPaterno}
                                    /> 
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col xs={12} sm={8} lg={4}>
                                    <Form.Label>RuT </Form.Label>
                                    <Form.Control 
                                    size="sm" 
                                    type="text" 
                                    placeholder=""
                                    name="run"
                                    onChange={actualizarState}
                                    value={run} 
                                    /> 
                                </Col>
                                <Col xs={12} sm={8} lg={8}>
                                    <Form.Label>Correo </Form.Label>
                                    <Form.Control 
                                    size="sm" 
                                    type="text" 
                                    placeholder=""
                                    name="run"
                                    onChange={actualizarState}
                                    value={run} 
                                    /> 
                                </Col>
                            </Form.Row>
                            <hr/>
                            <h6> Increse Credenciales </h6>
                            <Form.Row>
                                <Col xs={12} sm={8} lg={6}>
                                    <Form.Label> Creé Password</Form.Label>
                                    <Form.Control 
                                    size="sm"
                                    type="text" 
                                    placeholder=""
                                    name="username"
                                    onChange={actualizarState}
                                    value={username}
                                    /> 
                                </Col>
                                <Col xs={12} sm={8} lg={6}>
                                    <Form.Label> Valide Password</Form.Label>
                                    <Form.Control 
                                    size="sm" 
                                    type="text" 
                                    placeholder=""
                                    name="password"
                                    onChange={actualizarState}
                                    value={password}
                                    /> 
                                </Col>
                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Col xs={12} sm={8} lg={6}>

                                </Col>
                                <Col xs={12} sm={8} lg={6}>
                                    <Row>
                                        <Col>
                                            <Button
                                                type="submit"
                                                className="btn btn-block ">
                                                Registrar
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                className="btn btn-block bg-warning "
                                                onClick={Restablecer}
                                                >
                                                Restablecer
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Form.Row>
                        </Form>
                        <div>
                            <h5 className={claseError}>{mensajeError}</h5>
                         </div>
                        </Card> 
                    }               
                    </Col>
                    <Col xs={12} lg={2}></Col>
                </Row>
            </Container>
        </Fragment>             
    );
}
export default RegistroUsuario;

