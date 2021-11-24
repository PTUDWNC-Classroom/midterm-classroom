import axios from "axios";

const url = `${process.env.REACT_APP_HOST}join/invite`

export default async function sendInviteLink(invite,email) 
{
    const role = localStorage.getItem('inviteRole');
    localStorage.removeItem('inviteRole');
    //console.log(invite);
    //console.log(email)
    try {
      //const response = await axios.get(`${process.env.REACT_APP_HOST}classes`);
      const response = await axios.post(url,{
        invite: invite,
        email: email,
        role: role
                  });
     //console.log("response")
     return response.data;
    } catch (error) {
      //console.error(error);
      return false;
    }
  }