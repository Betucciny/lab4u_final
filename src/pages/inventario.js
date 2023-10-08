import {MainLayout} from "@/components/layout";
import {useEffect, useMemo, useState} from "react";
import {
    Pagination,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {withSessionPage} from "@/lib/session";

export default function Home(props) {

    const [user_session, setUser_session] = useState({
        isLoggedIn: props.isLoggedIn,
        nombre: props.user,
        roles: props.role
    });

    const [active, setActive] = useState(0);

    const categories = [
        {name: "Materiales", url: "/api/materiales"},
        {name: "Reactivos", url: "/api/reactivos"},
        {name: "Kits", url: "/api/kits"}
    ]
    const materialesHeader = ["ID", "Nombre", "Marca", "Tipo", "Descripcion"];
    const reactivosHeader = ["ID", "Nombre", "Marca", "Contenedor", "NumCAS", "Cantidad", "Unidad"];
    const kitsHeader = ["ID", "Nombre", "Marca", "Tipo", "Descripcion", "Materiales"];



    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [pages, setPages] = useState(1);

    const rowsPerPage = 15;

    const items = useMemo(() => {

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }, [page, data]);

    useEffect( () => {
        const fetchData = async () => {
            try{
                const res = await fetch(categories[active].url);
                const json = await res.json();
                setData(json.data);
                setPages(Math.ceil(json.data.length / rowsPerPage))
                console.log(json.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [active])

    console.log(`Pages ${pages}`)

    return (
        <MainLayout isLoggedIn={user_session.isLoggedIn} name={user_session.nombre} role={user_session.roles}>
            <h1> Inventario </h1>
            <p> {active}</p>
            <div>
                <Select
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
                        <SelectItem key={index} value={index}>
                            {item.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div>
                {data.length > 0 && <Table
                    aria-label="Tabla con inventario"
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
                        </div>}
                >
                    <TableHeader>
                        {Object.keys(data[0]).map((key, index) => (
                            <TableColumn key={index} align="center">
                                {key}
                            </TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {items.map((row, indexrow) => (
                            <TableRow key={indexrow}>
                                {Object.values(row).map((value, index) => (
                                    <TableCell key={`${indexrow}-${index}`} align="center">
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}

            </div>

        </MainLayout>
    )
}

export const getServerSideProps = withSessionPage()