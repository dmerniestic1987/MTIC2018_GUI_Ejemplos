pragma solidity ^0.5.0;
import "./Ownable.sol";

contract FactoryProyectoInversion is Ownable{
    address[] public contratosDeployados;
    
    event ContratoCreadoEvent( address indexed _contract_address,
                               address indexed _owner);

    function crearProyectoInversion(uint _contribucionMinima, uint _total_requerido) public{
        ProyectoInversion pi = new ProyectoInversion(_contribucionMinima, _total_requerido, msg.sender);
        address piAddress = address(pi);
        contratosDeployados.push(piAddress);
        emit ContratoCreadoEvent(piAddress, owner);
    }

    function obtenerContratosPI() public view returns (address[] memory) {
        return contratosDeployados;
    }
}

/**
 * @title ProyectoInversion
 * @dev El beneficiario de la inversión da alta un nuevo proyecto en la plataforma
 * de Crowfounding y los inversores aportan dinero en caso que les guste el proyecto.
 * El dinero no se libera al beneficiario, sino que queda almacenado en el contrato, 
 * luego el beneficiario crea Solicitudes de Pago para pagarle a algún proveedor 
 * necesario para ejecutar el proyectos y los inversores votan para liberar o no el
 * pago. 
 */
contract ProyectoInversion is Ownable{
    struct SolicitudPago {
        uint monto;
        uint votosFavor;
        bool completo;  
        address payable proveedor;
        string descripcion;        
        mapping(address => bool) votantes;
    }
    SolicitudPago[] public solicitudes;
    uint public totalRequerido;
    uint public contribucionMinima;
    uint public cantidadInversores;
    mapping(address => bool) public inversores;
    
    event InvertirEvent(address indexed _owner, uint _inversor_number);
    event AprobarSolicitudEvent(uint _votos_favor);
    event PagarEvent(address indexed _proveedor, uint _monto, uint _votos_favor);

    constructor(uint _contribucionMinima, uint _total_requerido, address payable _empresario) public {
        owner = _empresario;
        contribucionMinima = _contribucionMinima;
        cantidadInversores = 0;
        totalRequerido = _total_requerido;
    }
   
   /**
   * @dev Setea la contribución mínima del proyecto
   */
    function setContribucionMinima(uint _contribucionMinima) public onlyOwner("4001 - Solo el empresario la puede cambiar") {
        contribucionMinima = _contribucionMinima;
    }

   /**
   * @dev Le permite a un suario invertir en el proyecto. La convierte en inversora.
   */
    function invertir() external payable {
        require(msg.value >= contribucionMinima, "101 - Intenta invertir menos que la contribución mínima");
        if (!inversores[msg.sender]){
            cantidadInversores++; 
        }
        inversores[msg.sender] = true;
        emit InvertirEvent(owner, cantidadInversores);
    }

    /**
    * @dev El beneficiario de la inversión crea una solicitud de Pago
    * @param _monto Dirección del proveedor
    * @param _proveedor Dirección del proveedor
    * @return {
        "_id": "ID de la solcitud de depósito"
      }
    */
    function crearSolicitudPago(uint _monto, address payable _proveedor, string calldata _descripcion) external 
       onlyOwner("0001 - Solo el beneficiario puede crear solicitudes") returns (uint){  
        //El método push devuevle la nueva longitud del array
       uint id = solicitudes.push(SolicitudPago(_monto, 0, false, _proveedor, _descripcion)) - 1;
       return id;
    }

    /**
    * @dev Cualquiera de los inversores solicita la aprobación del pago
    */
    function aprobarSolicitudPago(uint _idSolicitud) external {
        require(inversores[msg.sender], "200 - Usted no es inversor para aprobar");
        require(_idSolicitud < solicitudes.length, "201 el ID ingresado no existe");
        require(!solicitudes[_idSolicitud].votantes[msg.sender], "202 - Usted ya votó esta propuesta");
        solicitudes[_idSolicitud].votantes[msg.sender] = true;
        solicitudes[_idSolicitud].votosFavor++;
        emit AprobarSolicitudEvent(solicitudes[_idSolicitud].votosFavor);
    }

    /**
     * @dev Una vez que se han obtenido todas las aprobaciones, el beneficiario
     * de la inversión 
     */
    function pagar(uint _idSolicitud) external payable onlyOwner("0002 - Usted no es le beneficiario"){
        require(_idSolicitud < solicitudes.length, "301 el ID ingresado no existe para el pago");
        require(cantidadInversores > 0, "302 - No hay inversores");
        require(!solicitudes[_idSolicitud].completo, "303 - Solicitud ya pagada");
        require(solicitudes[_idSolicitud].votosFavor > (cantidadInversores / 2));
        solicitudes[_idSolicitud].proveedor.transfer(solicitudes[_idSolicitud].monto);
        solicitudes[_idSolicitud].completo = true;
        emit PagarEvent( solicitudes[_idSolicitud].proveedor
                       , solicitudes[_idSolicitud].monto
                       , solicitudes[_idSolicitud].votosFavor);
    }

}