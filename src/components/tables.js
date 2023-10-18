import {
    Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure
} from "@nextui-org/react";
import {useMemo, useState} from "react";


function TableExistenciasReactivos({existencias, visible, onRowClick, reactivo}) {
    const headers = ["Caducidad", "Estatus", "Numero de Serie", "Contenido", "Obervaciones", "Ubicacion", "Entrada"];
    const rowsPerPage = 10;

    const [page, setPage] = useState(1);
    const pages = Math.ceil(existencias.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return existencias.slice(start, end);
    }, [page, existencias]);

    if (existencias.length === 0) return <></>;

    return (
        visible ? (
            <Table
                aria-label="Example table with client side pagination"
                selectionMode="replace"
                onRowAction={(row) => {
                    const existencia = existencias.filter((existencia) => existencia.id.toString() === row)[0];
                    onRowClick(existencia, reactivo)
                }}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }>
                <TableHeader>
                    {headers.map((header) => (
                        <TableColumn key={header}>{header}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {items.map((existencia) => (
                        <TableRow key={existencia.id}>
                            <TableCell>{existencia.caducidad}</TableCell>
                            <TableCell>{existencia.estatus}</TableCell>
                            <TableCell>{existencia.numserie}</TableCell>
                            <TableCell>{existencia.contenido}</TableCell>
                            <TableCell>{existencia.observaciones}</TableCell>
                            <TableCell>{existencia.ubicacion}</TableCell>
                            <TableCell>{existencia.entrada}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : <> </>)

}


function TableMateriales({materiales, visible, onRowClick}) {

    const headers = ["Nombre", "Marca", "Tipo", "Descripcion"];

    const rowsPerPage = 10;

    const [page, setPage] = useState(1);
    const pages = Math.ceil(materiales.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return materiales.slice(start, end);
    }, [page, materiales]);

    if (materiales.length === 0) return <></>;

    return (
        visible ? (
            <Table
                aria-label="Example table with client side pagination"
                selectionMode="replace"
                onRowAction={(row) => {
                    const material = materiales.filter((material) => material.id.toString() === row)[0];
                    onRowClick(material)
                }}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }>
                <TableHeader>
                    {headers.map((header) => (
                        <TableColumn key={header}>{header}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {items.map((material) => (
                        <TableRow key={material.id}>
                            <TableCell>{material.nombre}</TableCell>
                            <TableCell>{material.marca}</TableCell>
                            <TableCell>{material.tipo}</TableCell>
                            <TableCell>{material.descripcion}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : <> </>)
}

function TableMaterialesKit({materiales, visible, onRowClick}) {

    const headers = ["Nombre", "Marca", "Tipo", "Descripcion", "Cantidad"];

    const rowsPerPage = 10;

    const [page, setPage] = useState(1);
    const pages = Math.ceil(materiales.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return materiales.slice(start, end);
    }, [page, materiales]);

    if (materiales.length === 0) return <></>;

    return (
        visible ? (
            <Table
                aria-label="Example table with client side pagination"
                selectionMode="replace"
                onRowAction={(row) => {
                    const material = materiales.filter((material) => material.id.toString() === row)[0];
                    onRowClick(material)
                }}
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }>
                <TableHeader>
                    {headers.map((header) => (
                        <TableColumn key={header}>{header}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {items.map((material) => (
                        <TableRow key={material.id}>
                            <TableCell>{material.nombre}</TableCell>
                            <TableCell>{material.marca}</TableCell>
                            <TableCell>{material.tipo}</TableCell>
                            <TableCell>{material.descripcion}</TableCell>
                            <TableCell>{material.cantidad}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : <> </>)
}


function TableReactivos({reactivos, visible, onRowClick, onRowClickExistencias}) {

    const headers = ["Nombre", "Marca", "Contenedor", "NumCAS", "Cantidad", "Unidad", "Formula", "Existencias"];

    const rowsPerPage = 10;

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [active, setActive] = useState(undefined);
    const [reactivo, setReactivo] = useState(undefined);
    const [page, setPage] = useState(1);
    const pages = Math.ceil(reactivos.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return reactivos.slice(start, end);
    }, [page, reactivos]);

    if (reactivos.length === 0) return <></>;
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onClose} size="4xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Materiales</ModalHeader>
                            <ModalBody>
                                {
                                    active !== undefined ?
                                        <TableExistenciasReactivos existencias={active} visible={true}
                                                                   onRowClick={onRowClickExistencias} reactivo={reactivo}/> : <></>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button auto onClick={onClose}>Cerrar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>

            </Modal>

            {visible ? (
                <Table
                    aria-label="Example table with client side pagination"
                    selectionMode="replace"
                    onRowAction={(row) => {
                        const reactivo = reactivos.filter((reactivo) => reactivo.id.toString() === row)[0];
                        onRowClick(reactivo)
                    }}
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }>
                    <TableHeader>
                        {headers.map((header) => (
                            <TableColumn key={header}>{header}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {items.map((reactivo) => (
                            <TableRow key={reactivo.id}>
                                <TableCell>{reactivo.nombre}</TableCell>
                                <TableCell>{reactivo.marca}</TableCell>
                                <TableCell>{reactivo.contenedor}</TableCell>
                                <TableCell>{reactivo.numcas}</TableCell>
                                <TableCell>{reactivo.cantidad}</TableCell>
                                <TableCell>{reactivo.unidad}</TableCell>
                                <TableCell>{reactivo.formula}</TableCell>
                                <TableCell> <Button onPress={
                                    () => {
                                        setActive(reactivo.existencias);
                                        setReactivo(reactivo);
                                        onOpen();
                                    }
                                }> Existencias </Button> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            ) : <> </>}
        </>)
}

function TableKits({kits, visible, onRowClick, onRowClickMateriales}) {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [active, setActive] = useState(undefined);

    const rowsPerPage = 10;

    const [page, setPage] = useState(1);
    const pages = Math.ceil(kits.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return kits.slice(start, end);
    }, [page, kits]);


    if (kits.length === 0) return <></>;

    const headers = ["Nombre", "Marca", "Tipo", "Descripcion", "Materiales"];
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onClose} size="4xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Materiales</ModalHeader>
                            <ModalBody>
                                {
                                    active !== undefined ?
                                        <TableMaterialesKit materiales={active} visible={true}
                                                            onRowClick={onRowClickMateriales}/> : <></>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button auto onClick={onClose}>Cerrar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>

            </Modal>

            {visible ? (
                <>
                    <Table
                        aria-label="Example table with client side pagination"
                        selectionMode="replace"
                        onRowAction={(row) => {
                            const kit = kits.filter((kit) => kit.id.toString() === row)[0];
                            onRowClick(kit)
                        }}
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="secondary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        }>
                        <TableHeader>
                            {headers.map((header) => (
                                <TableColumn key={header}>{header}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {items.map((kit) => (
                                <TableRow key={kit.id}>
                                    <TableCell>{kit.nombre}</TableCell>
                                    <TableCell>{kit.marca}</TableCell>
                                    <TableCell>{kit.tipo}</TableCell>
                                    <TableCell>{kit.descripcion}</TableCell>
                                    <TableCell> <Button
                                        onPress={
                                            () => {
                                                setActive(kit.materiales);
                                                onOpen();
                                            }
                                        }>
                                        Materiales
                                    </Button> </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </>
            ) : <></>}
        </>

    )
}


function TableContenidoVale({items, onDelete, onNumberChange}) {
    const headers = ["Nombre", "Tipo", "Descripcion", "Cantidad", "Eliminar"];
    const max = 10

    return (
        <Table
            aria-label="Example table with client side pagination"
        >
            <TableHeader>
                {headers.map((header) => (
                    <TableColumn key={header}>{header}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell>{item.tipo}</TableCell>
                        <TableCell>{item.descripcion}</TableCell>
                        <TableCell>  {item.tipo !== "Reactivo" ? <input type="number" min="1" max={max} defaultValue={1} onChange={(e) => {
                            onNumberChange(index, e.target.value)
                        }}/>: "1"} </TableCell>
                        <TableCell> <Button onPress={() => {
                            onDelete(index)
                        }}> Eliminar </Button> </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

}


export {TableMateriales, TableReactivos, TableKits, TableContenidoVale};