import axios from "axios";

const url = "http://localhost:3000/user/sign-up"

export default async function sendUserInfoSignUp(userInfo) 
{
    console.log(userInfo);
    try {
      //const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
      const response = await axios.post(url,{
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username
                  });

      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }