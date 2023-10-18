import {MainLayout} from "@/components/layout";
import {useEffect, useMemo, useState} from "react";
import {
    Select,
    SelectItem,
} from "@nextui-org/react";
import {withSessionPage} from "@/lib/session";
import {TableKits, TableMateriales, TableReactivos} from "@/components/tables";
import {getAllKits, getAllMateriales, getAllReactivos} from "@/server_sevices/selects";


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

    return (
        <MainLayout isLoggedIn={user_session.isLoggedIn} name={user_session.nombre} role={user_session.roles}>
            <h1> Inventario </h1>
            <div className="p-3 flex items-center">
                <Select
                    aria-label={"Categoria"}
                    label='Categoria'
                    className="max-w-xs"
                    placeholder={"Materiales"}
                    onChange={(e) => {
                        if (active !== e.target.value && e.target.value !== "") setActive(e.target.value)
                        console.log(e.target.value)
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
            <TableMateriales materiales={dataMateriales} visible={active === '0'} onRowClick={(row) => console.log(row)}/>
            <TableReactivos reactivos={dataReactivos} visible={active === '1'} onRowClick={(row) => console.log(row)} onRowClickExistencias={(row) => console.log(row)}/>
            <TableKits kits={dataKits} visible={active === '2'} onRowClick={(row) => console.log(row)} onRowClickMateriales={(row) => console.log(row)}/>

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