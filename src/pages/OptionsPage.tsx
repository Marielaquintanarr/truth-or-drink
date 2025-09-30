
export default function OptionsPage() {
    return(
        <>
            <h1>PLAYER´S DESICION</h1>
            <div style={{ position: "relative", width: "200px", height: "200px" }}>
                <button style={{
                    backgroundColor: "#580101", 
                    width: "200px", 
                    height: "200px",
                    borderRadius: "30px", 
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,}} />
                <button style={{
                    backgroundColor: "#8C0303", 
                    position: "absolute",
                    width: "200px", 
                    height: "200px", 
                    borderRadius: "55px", 
                    zIndex: 2,
                    left: 0,}}>
                        DRINK
                </button>
            </div>

            <div style={{ position: "relative", width: "200px", height: "200px" }}>
                <button style={{
                    backgroundColor: "#325300", 
                    width: "200px", 
                    height: "200px",
                    borderRadius: "30px", 
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,}} />
                <button style={{
                    backgroundColor: "#426D02", 
                    position: "absolute",
                    width: "200px", 
                    height: "200px", 
                    borderRadius: "55px", 
                    zIndex: 2,
                    left: 0,}}>
                        TRUTH
                    </button>
            </div>
        </>
    )
}