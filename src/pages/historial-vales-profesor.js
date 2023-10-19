import {withSessionPage} from "@/lib/session";
import {getVales} from "@/server_sevices/selects";
import {MainLayout} from "@/components/layout";
import Vales from "@/components/accordions";


export default function Home(props) {
    return (
        <MainLayout isLoggedIn={props.isLoggedIn} name={props.user} role={props.role}>
            <h1> Historial de vales </h1>
            <Vales vales={props.vales}/>
        </MainLayout>

    )
}

export const getServerSideProps = withSessionPage(async function ({req, res}) {
    const id = req.session.get("id");
    const vales = await getVales(id);
    console.log(vales[0].materiales)
    console.log(vales[0].reactivos)
    return {
        props: {
            isLoggedIn: req.session.get("isLoggedIn") || false,
            user: req.session.get("user") || {},
            role: req.session.get("role") || [],
            vales: vales
        }
    }
})