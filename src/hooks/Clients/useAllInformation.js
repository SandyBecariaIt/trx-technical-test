import TRXClient from "./TRXClient";

const useAllInformation = () => {
  const { getAllInformation } = TRXClient();
  
  const getAllLocations = async () => {
    try {
      const response = await getAllInformation();
      return response;
    } catch (err) {
      throw (err);
    }
  };
  
  return {
    getAllLocations
  };
};

export default useAllInformation;
