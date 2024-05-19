import axios from 'axios';

const baseUrl = "https://new-era-resume.vercel.app/";

export const defaultFunc = ()=> {
    axios({
        method: "get",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url: baseUrl,
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
  
}

export const enhancePrompt = (prompt) => {
    return axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: `${baseUrl}enhancePrompt`,
        data: {
            prompt: prompt
        }
    })
    .then(function (response) {
        return response?.data?.completion?.choices[0]?.message?.content;
    })
    .catch(function (error) {
        console.log(error);
    });
};


export const addUserToDb = (values) => {
  return axios({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `${baseUrl}user`,
    data:values
  })
  .then(function (response) {
      return response;
  })
  .catch(function (error) {
      console.log(error);
  });
};

export const getUserById = (id) => {
  return axios({
    method: "get",
    headers: { "Content-Type": "application/json" },
    url: `${baseUrl}user/${id}`,
  })
  .then(function (response) {
      return response;
  })
  .catch(function (error) {
      console.log(error);
  });
};