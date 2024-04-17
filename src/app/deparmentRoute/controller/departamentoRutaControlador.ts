import { Request, Response } from 'express';
import DepartamentoRutaDao from '../dao/departamentoRutaDao';
import DepartamentoRuta from '../../../model/departamentoRuta';

class DepartamentoRutaControlador extends DepartamentoRutaDao {

    public crearDepartamentoRuta(req: Request, res: Response): void {
        const objDepaRuta: DepartamentoRuta = req.body;
        DepartamentoRutaDao.crear(res, objDepaRuta);
    }

    public consultarDepartamentoRuta(req: Request, res: Response): void {
        DepartamentoRutaDao.consultar(res);
    }

    public consultarRutasPorDepartamento(req: Request, res: Response): void {
        let codDepartamento = Number(req.params.codDepartamento);
        if (!isNaN(codDepartamento)) {
            DepartamentoRutaDao.obtenerPorDepartamento(res, codDepartamento);
        } else {
        res.status(400).json({respuesta:"Codigo de departamento no valido"});
        }
    }

    public consultarDepartamentosPorRuta(req: Request, res: Response): void {
        let codRuta = Number(req.params.codRuta);
        if (!isNaN(codRuta)) {
            DepartamentoRutaDao.obtenerPorDepartamento(res, codRuta);
        } else {
        res.status(400).json({respuesta:"Codigo de ruta no valido"});
        }
    }

    public actualizarDepartamentoRuta(req: Request, res: Response): void {
        const objDepaRuta: DepartamentoRuta = req.body;
        DepartamentoRutaDao.actualizarPorDepartamento(res, objDepaRuta);
    }
    
    
    public eliminarDepartamentosPorRuta(req: Request, res: Response): void {
        let codDepaRuta = Number(req.params.codDepaRuta);
        if (!isNaN(codDepaRuta)) {
            DepartamentoRutaDao.eliminarDepartamentoRuta(res, codDepaRuta);
        } else {
        res.status(400).json({respuesta:"Codigo de ruta no valido"});
        }
    }



}
const departamentoRutaControlador = new DepartamentoRutaControlador();
export default departamentoRutaControlador;

