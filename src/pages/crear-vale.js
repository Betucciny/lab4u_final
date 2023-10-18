import {withSessionPage} from "@/lib/session";
import {MainLayout} from "@/components/layout";
import Link from "next/link";
import {TableContenidoVale, TableKits, TableMateriales, TableReactivos} from "@/components/tables";
import {useState} from "react";
import {getAllKits, getAllMateriales, getAllReactivos} from "@/server_sevices/selects";
import {Button, Input, Radio, RadioGroup, Select, SelectItem} from "@nextui-org/react";

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
        {name: "Kits", url: "/api/select/kits"}
    ]

    const [dataMateriales, setdataMateriales] = useState(props.dataMateriales);
    const [dataReactivos, setdataReactivos] = useState(props.dataReactivos);
    const [dataKits, setdataKits] = useState(props.dataKits);

    const [itemsVale, setItemsVale] = useState([]);


    const onMaterialClick = (material) => {
        const newMaterial = {
            id: material.id,
            nombre: material.nombre,
            tipo: material.tipo,
            descripcion: material.descripcion,
            cantidad: 1,
        }
        setItemsVale([...itemsVale, newMaterial]);
    }

    const onReactivoClick = (existencia, reactivo) => {
        const newReactivo = {
            id: reactivo.id,
            nombre: reactivo.nombre,
            tipo: "Reactivo",
            descripcion: existencia.numserie,
            cantidad: 1,
        }
        setItemsVale([...itemsVale, newReactivo]);
    }

    const onNumberChange = (index, e) => {
        const item = itemsVale[index];
        try{
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


    return (
        <MainLayout isLoggedIn={props.isLoggedIn} name={props.user} role={props.role}>
            <h1> Crear Vale </h1>
            <div className="flex">
                <div className="w-1/2 p-4 ip">
                    <Input type={"text"} placeholder={"Grupo"} className="p-2"/>
                    <Input type={"text"} placeholder={"Materia"} className="p-2"/>
                    <Input type={"date"} placeholder={"Fecha"} className="p-2"/>
                    <Input type={"text"} placeholder={"Estatus"} className="p-2"/>
                    <RadioGroup label={"Estatus"} className="p-2">
                        <Radio value="0">Pendiente</Radio>
                        <Radio value="1">Entregado</Radio>
                    </RadioGroup>
                    <TableContenidoVale items={itemsVale} onNumberChange={onNumberChange} onDelete={onDeleteClick}/>
                    <div className="flex justify-center p-5">
                        <Button auto>Guardar</Button>
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
                            {categories.map((item,index) => (
                                <SelectItem key={index} value={index} aria-label={index}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <TableMateriales materiales={dataMateriales} visible={active === '0'} onRowClick={onMaterialClick}/>
                    <TableReactivos reactivos={dataReactivos} visible={active === '1'} onRowClick={() => {}} onRowClickExistencias={onReactivoClick}/>
                    <TableKits kits={dataKits} visible={active === '2'} onRowClick={onMaterialClick} onRowClickMateriales={() => {}}/>
                </div>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = withSessionPage(async function ({req, res}) {
    const dataMateriales = await getAllMateriales();
    const dataReactivos = await getAllReactivos();
    const dataKits = await getAllKits();


    return {
        props: {
            isLoggedIn: req.session.get("isLoggedIn") || false,
            user: req.session.get("user") || {},
            role: req.session.get("role") || [],
            dataMateriales: dataMateriales,
            dataReactivos: dataReactivos,
            dataKits: dataKits
        }
    }
})