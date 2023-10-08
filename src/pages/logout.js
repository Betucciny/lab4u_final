import {withSession} from "@/lib/session";

export default function Logout({}) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Logout Successful</h1>
                <p className="text-gray-600 mb-6">You have been successfully logged out.</p>
                <a href="/login" className="text-blue-600 font-semibold hover:underline">Log In Again</a>
            </div>
        </div>
    )
}

export const getServerSideProps = withSession(async function ({req, res}) {
    req.session.destroy();
    return {props: {}};
});