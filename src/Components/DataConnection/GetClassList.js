import axios from "axios";

export default async function getClassList(setIsLoaded,setItems,setError) 
{
    try {
      //const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
      const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
      if (response) {
        setIsLoaded(true);
        setItems(response.data);
      }
    } catch (error) {
      //console.error(error);
      setIsLoaded(true);
      setError(error);
    }
  }