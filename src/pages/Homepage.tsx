import homepageImage from "../assets/homepageImage.png";
import CustomButton from "../components/CustomButton";
export default function Homepage() {
    return(
        <>
        <h1 className="text-white text-9xl">TRUTH OR DARE</h1>
            <img src={homepageImage} />
            <CustomButton />
        </>
    )
}