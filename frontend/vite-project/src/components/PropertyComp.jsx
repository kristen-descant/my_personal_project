export default function PropertyComp(props) {
  
    const {address, newPropertyImage, beds, baths, sqft,
    max, mean, median, min, details} = props;

    return (
       <>
          <p>{address}</p><br />
          <div>
            <img src={newPropertyImage} alt="" />
          </div>
          <div>
            <p>Beds: {beds} Baths: {baths} Sqft: {sqft}</p>
          </div>
          <div>
            <p>Max Rent: {max} Mean: {mean} Median: {median} Min: {min}</p>
          </div>
          <div>
            {details}
          </div>
        </>
    )
}