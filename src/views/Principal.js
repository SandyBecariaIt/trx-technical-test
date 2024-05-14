import { useEffect, useState } from "react";
import CheckComponent from "../components/CheckboxComponent";
import InputComponent from "../components/InputComponent";
import MapsComponemt from "../components/MapsComponent";
import useAllInformation from "../hooks/Clients/useAllInformation";


const Principal = () => {
  const { getAllLocations } = useAllInformation();
  const [markers, setMarkers] = useState([]);
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState([]);
  const [locationsCopy, setLocationsCopy] = useState([]);
  useEffect(() => {
    getAllLocationsFunction();
  }, []);

  const getAllLocationsFunction = async () => {
    try {
      const response = await getAllLocations();
      const data = response.data.filter(e => e.properties.name);
      editArray(data);
      
    } catch (err) {
      console.log(err)
    }
  };

  const editArray = (array = []) => {
    const values = array.map((item, index) => {
      return {
        id: index,
        name: item.properties.name,
        checked: true,
        geometry: item.geometry.coordinates
      }
    });

    setLocations(values);
    getMarkers(values);
    setLocationsCopy(values);
  };

  const getMarkers = (array = []) => {
    const filtersValues = array.filter(item => item.checked);
    const values = filtersValues.map(item => {
      return {
        id: item.name,
        title: item.name,
        position: {
          lat: Number(item.geometry[1]),
          lng: Number(item.geometry[0])
        }
      }
    });

    setMarkers(values);
  };

  const updateChecked = (value) => {
    const newArray = locations;
    newArray[value].checked = !newArray[value].checked;
    setLocations(newArray)
    getMarkers(newArray);
  };

  const filterSearch = (value) => {
    const newArray = locationsCopy;
    if (value !== '') {
      const filtersValues = newArray.filter(item => item?.name?.toLowerCase().includes(value.toLowerCase()));
      setLocations(filtersValues)
      getMarkers(filtersValues);
    } else {
      setLocations(newArray)
      getMarkers(newArray);
    }
  };

  return (
    <div class="columns is-centered">
      <div class="column is-two-thirds">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Detalles de vehículos</p>
          </header>

          <div class="card-content">
            <div class="content">
              <MapsComponemt
                locationsProps={markers}
              />
              <hr />
              <InputComponent
                value={search}
                hdlOnChange={(e) => {
                  setSearch(e.target.value)
                  filterSearch(e.target.value)
                }}
              />

              <div>
                <div>
                  {locations.map((item) => {
                    return (
                      <div>
                        <CheckComponent
                          key={item.id}
                          label={item.name}
                          checked={item.checked}
                          hdlOnChange={() => updateChecked(item.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
