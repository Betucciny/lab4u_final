import {withSession} from "@/lib/session";


export default function Logout() {
    return (
        <>
        </>
    )
}

export const getServerSideProps = withSession(async function ({req, res}) {
    req.session.destroy();
    res.writeHead(302, {Location: "/login"});
    res.end();
    return {props: {}};
});