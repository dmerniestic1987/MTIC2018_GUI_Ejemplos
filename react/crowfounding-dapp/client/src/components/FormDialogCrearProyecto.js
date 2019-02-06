import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class FormDialogCrearProyecto extends React.Component {
  state = { 
    open: false, 
    cantidadMinimaInversion: 0,
    totalRequerido: 0,
    descripcion: ''
  };
 
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCreateProject = async () => {
    this.handleClose();
    const web3 = this.props.web3;
    const factoryContract = this.props.factoryContract;
    const accounts = this.props.accounts;

    const contribucionMinima = web3.utils.toWei(this.state.cantidadMinimaInversion, 'ether');
    const totalRequerido = web3.utils.toWei(this.state.totalRequerido, 'ether');
    const options = { from: accounts[0] };
    try{
        const trx = await factoryContract.methods
                         .crearProyectoInversion(contribucionMinima, totalRequerido)
                         .send(options);
        console.log(trx.transactionHash);           
    }
    catch(error){
      console.log(error);
      alert(error);
    }
  };

  handleChange = (name, event) => {
    this.setState(
        {[name]: event.target.value}
    );
 }


  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            Crear Proyecto
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Crear Proyecto</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Hola! Para crear un proyecto es necesario que completes la siguiente
                información. Te recordamos que debes contar con Ether para para poder
                crear un nuevo proyecto.
            </DialogContentText>
            <TextField
              name="cantidadMinimaInversion"
              variant="outlined"
              autoFocus
              margin="dense"
              id="cantidadMinimaInversion"
              label="Aporte mínimo de inversores en Ether"
              type="number"
              fullWidth
              onChange={(event) => this.handleChange('cantidadMinimaInversion', event)}
            />
            <TextField
              name="totalRequerido"
              variant="outlined"
              margin="dense"
              id="totalRequerido"
              label="Costo total del proyecto en Ether"
              type="number"
              fullWidth
              onChange={(event) => this.handleChange('totalRequerido', event)}
            />            
            <TextField
              name="descripcion"
              variant="outlined"
              margin="dense"
              id="descripcion"
              label="Descripción del proyecto"
              type="text"
              fullWidth
              onChange={(event) => this.handleChange('descripcion', event)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleCreateProject} color="primary">
              Crear proyecto
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}