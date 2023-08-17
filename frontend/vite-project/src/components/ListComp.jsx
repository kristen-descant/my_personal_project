import { useNavigate } from "react-router-dom";

export default function ListComp(prop) {

    const navigate = useNavigate();
    const {properties} = prop;

    const handlePropertyClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
        };
    
      
    
        return (
            <>
              <div className="portfolioList">
                <ul>
                  {properties && (
                    properties.map((property) => (
                      <li key={property.id} onClick={() => handlePropertyClick(property.id)}>
                        {property.address}
                        <img src={property.property_image} alt="house" />
                      </li>
                    ))
                  ) 
                  }
                </ul>
              </div>
            </>
          );
}