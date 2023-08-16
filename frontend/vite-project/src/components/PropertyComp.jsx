
export default function PropertyComp({property}){
    
    const {id, street} = property
    

    return (
        <>
        <p>Property ID: {id}</p>
        <p>Street: {street}</p>
        </>
    )

}