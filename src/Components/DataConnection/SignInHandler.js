import axios from "axios";

const url = "http://localhost:3000/user/sign-in"

export default async function sendUserInfoSignIn(userInfo) 
{
    console.log(userInfo);
    try {
      //const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
      const response = await axios.post(url,{
        username: userInfo.username,
        password: userInfo.password,
                  });

      if (response) {
        console.log("da sign in")
      }
    } catch (error) {
      console.error(error);
    }
  }