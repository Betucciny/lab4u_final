import {
    Accordion,
    AccordionItem,
    Card,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";


function AccordionVales({vale, key}) {
    let {materiales, reactivos} = vale;
    const materialesColumns = ["Nombre", "Tipo", "Descripcion", "Codigo", "Cantidad"];
    const reactivosColumns = ["Nombre", "Numcas", "Formula", "Contenedor", "Cantidad", "Numero de serie"];

    return (
        <Card shadow>
            <Accordion>
                <AccordionItem key={`${key}1`} title="Información vale">
                    <p>Fecha: {vale.fecha}</p>
                    <p>Estatus: {vale.estatus}</p>
                    <p>Materia: {vale.materia}</p>
                    <p>Grupo: {vale.grupo}</p>
                    <p>Semestre: {vale.semestre}</p>
                </AccordionItem>
                <AccordionItem key={`${key}2`} title="Materiales">
                    <Table>
                        <TableHeader>
                            {materialesColumns.map((column, index) => (
                                <TableColumn key={index}>{column}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {materiales.map((material, index) => (
                                <TableRow key={index}>
                                    <TableCell>{material.nombre}</TableCell>
                                    <TableCell>{material.tipo}</TableCell>
                                    <TableCell>{material.descripcion}</TableCell>
                                    <TableCell>{material.codigo}</TableCell>
                                    <TableCell>{material.cantidad}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </AccordionItem>
                <AccordionItem key={`${key}3`} title="Reactivos">
                    <Table>
                        <TableHeader>
                            {reactivosColumns.map((column, index) => (
                                <TableColumn key={index}>{column}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {reactivos.map((reactivo, index) => (
                                <TableRow key={index}>
                                    <TableCell>{reactivo.nombre}</TableCell>
                                    <TableCell>{reactivo.numcas}</TableCell>
                                    <TableCell>{reactivo.formula}</TableCell>
                                    <TableCell>{reactivo.contenedor}</TableCell>
                                    <TableCell>{`${reactivo.cantidad} ${reactivo.unidad}`}</TableCell>
                                    <TableCell>{reactivo.numserie}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

function Vales({vales}) {
    return (
        <div className="gap-2 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3" >
            {vales.map((vale, index) => (
                <AccordionVales key={index} vale={vale}/>
            ))}
        </div>)
}

export default Vales;