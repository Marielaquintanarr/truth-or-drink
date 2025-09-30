import { Link } from "react-router-dom";

export default function CustomButton() {
    return (
        <>
            <Link to="/levels" className="text-white rounded-lg text-xl">PLAY</Link>
        </>
    )
}