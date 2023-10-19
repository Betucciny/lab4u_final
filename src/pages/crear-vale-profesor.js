import {withSessionPage} from "@/lib/session";
import {MainLayout} from "@/components/layout";
import Link from "next/link";
import {TableContenidoVale, TableKits, TableMateriales, TableReactivos} from "@/components/tables";
import {useState} from "react";
import {getAllKits, getAllMateriales, getAllReactivos} from "@/server_sevices/selects";
import {
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Radio,
    RadioGroup,
    Select,
    SelectItem
} from "@nextui-org/react";
import axios from "axios";

export default function Home(props) {
    const [user_session, setUser_session] = useState({
        isLoggedIn: props.isLoggedIn,
        nombre: props.user,
        roles: props.role
    });

    const [active, setActive] = useState('0');

    const categories = [
        {name: "Materiales", url: "/api/select/materiales"},
        {name: "Reactivos", url: "/api/select/reactivos"},
    ]

    const [dataMateriales, setdataMateriales] = useState(props.dataMateriales);
    const [dataReactivos, setdataReactivos] = useState(props.dataReactivos);

    const [itemsVale, setItemsVale] = useState([]);

    const [Grupo, setGrupo] = useState("");
    const [Materia, setMateria] = useState("");
    const [Fecha, setFecha] = useState("");
    const [Estatus, setEstatus] = useState("");
    const [Semestre, setSemestre] = useState("");


    const onMaterialClick = (existencia, material) => {
        const isDuplicate = itemsVale.some(item => item.id === material.id && item.tipo === material.tipo);
        if (isDuplicate) return;
        const newMaterial = {
            id: material.id,
            nombre: material.nombre,
            tipo: material.tipo,
            descripcion: existencia.codigo,
            cantidad: "1",
        }
        setItemsVale([...itemsVale, newMaterial]);
    }

    const onReactivoClick = (existencia, reactivo) => {
        const isDuplicate = itemsVale.some(item => item.descripcion === existencia.numserie && item.tipo === "reactivo");
        if (isDuplicate) return;
        const newReactivo = {
            id: reactivo.id,
            nombre: reactivo.nombre,
            tipo: "reactivo",
            descripcion: existencia.numserie,
            cantidad: "1",
        }
        setItemsVale([...itemsVale, newReactivo]);
    }

    const onNumberChange = (index, e) => {
        const item = itemsVale[index];
        try {
            if (e.target.value === "") e.target.value = 0;
            if (e.target.value < 0) e.target.value = 0;
            item.cantidad = e.target.value;
            setItemsVale([...itemsVale]);
        } catch (e) {

        }
    }

    const onDeleteClick = (index) => {
        const newItems = itemsVale.filter((item, i) => i !== index);
        setItemsVale(newItems);
    }

    const onSureClick = async () => {
        if (Grupo === "" || Materia === "" || Fecha === "" || Estatus === "" || Semestre === "") {
            alert("Faltan campos por llenar");
            return;
        }
        const data = {
            idUsuario: props.id,
            grupo: Grupo,
            semestre: Semestre,
            materia: Materia,
            fecha: Fecha,
            estatus: Estatus,
            items: itemsVale
        }
        axios.post('/api/changes/vale', data).then((res) => {
            alert("Vale creado");
            setGrupo("");
            setMateria("");
            setFecha("");
            setEstatus("");
            setSemestre("");
            setItemsVale([]);
        }).catch((e) => {
            alert("Error al crear vale");
            console.log(e);
        })
    }


    return (
        <MainLayout isLoggedIn={props.isLoggedIn} name={props.user} role={props.role}>
            <h1> Crear Vale Profesor </h1>
            <div className="flex">
                <div className="w-1/2 p-4 ip">
                    <Input isRequired variant="faded" isClearable type={"text"} placeholder={"Grupo"} label={"Grupo"}
                           value={Grupo} className="p-2" onValueChange={setGrupo} isInvalid={Grupo === ""}/>
                    <Input isRequired variant="faded" isClearable type={"text"} placeholder={"Semestre"}
                           label={"Semestre"} value={Semestre} className="p-2" onValueChange={setSemestre}
                           isInvalid={Semestre === ""}/>
                    <Input isRequired variant="faded" isClearable type={"text"} placeholder={"Materia"}
                           label={"Materia"} value={Materia} className="p-2" onValueChange={setMateria}
                           isInvalid={Materia === ""}/>
                    <Input isRequired variant="faded" isClearable type={"date"} placeholder={"Fecha"} label={"Fecha"}
                           value={Fecha} className="p-2" onValueChange={setFecha} isInvalid={Fecha === ""}/>
                    <RadioGroup isRequired label={"Estatus"} className="p-2" value={Estatus} onValueChange={setEstatus}>
                        <Radio value="pendiente">Pendiente</Radio>
                        <Radio value="entregado">Entregado</Radio>
                    </RadioGroup>
                    <TableContenidoVale items={itemsVale} onNumberChange={onNumberChange} onDelete={onDeleteClick}/>
                    <div className="flex justify-center p-5">
                        <Popover>
                            <PopoverTrigger>
                                <Button auto>Crear Vale</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex flex-col justify-center items-center p-2">
                                    <h3 className="p-2">¿Estas seguro de crear el vale?</h3>
                                    <Button auto onPress={onSureClick}>Guardar</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="w-1/2 p-4 ">
                    <h2> Seleccionar Elementos </h2>
                    <div className="p-3 flex">
                        <Select
                            aria-label={"Categoria"}
                            label='Categoria'
                            className="max-w-xs"
                            placeholder={"Materiales"}
                            onChange={(e) => {
                                if (active !== e.target.value && e.target.value !== "") setActive(e.target.value)
                            }}
                            value={active}
                        >
                            {categories.map((item, index) => (
                                <SelectItem key={index} value={index} aria-label={index}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <TableMateriales materiales={dataMateriales} visible={active === '0'} onRowClick={onMaterialClick}
                                     onRowClickExistencias={onMaterialClick}/>
                    <TableReactivos reactivos={dataReactivos} visible={active === '1'} onRowClick={() => {
                    }} onRowClickExistencias={onReactivoClick}/>
                </div>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = withSessionPage(async function ({req, res}) {
    const dataMateriales = await getAllMateriales();
    const dataReactivos = await getAllReactivos();

    return {
        props: {
            isLoggedIn: req.session.get("isLoggedIn") || false,
            user: req.session.get("user") || {},
            role: req.session.get("role") || [],
            id: req.session.get("id") || "",
            dataMateriales: dataMateriales,
            dataReactivos: dataReactivos,
        }
    }
})