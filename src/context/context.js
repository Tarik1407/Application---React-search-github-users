import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [folowers, setFolowers] = useState(mockFollowers);
  const [loading, setLoading] = useState(false);
  const [requestLimit, setRequestLimit] = useState(1);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  // Check rate limit per hour
  const checkRequest = async () => {
    const response = await fetch(`${rootUrl}/rate_limit`);
    const data = await response.json();
    let { remaining } = data.rate;
    setRequestLimit(remaining);
    if (requestLimit === 0) {
      setIsError({
        show: true,
        msg: "Sorry you have exceeded your hourly rate limit!",
      });
    } else {
      setIsError({ show: false, msg: "" });
    }
  };

  const searchGithubUser = async (user) => {
    setIsError({ show: false, msg: "" });
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      const data = response.data;
      setGithubUser(data);
      const { login, followers_url } = data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100}`),
      ]).then((response) => {
        console.log(response);
        const [repos, followers] = response;
        console.log(repos, followers);
        if (repos.status === "fulfilled") setRepos(repos.value.data);
        if (folowers.status === "fulfilled") setFolowers(folowers.value.data);
      });
    } else {
      setIsError({ show: true, msg: "There is no user with that username" });
    }
    checkRequest();
    setLoading(false);
  };

  useEffect(() => {
    checkRequest();
  }, []);

  return (
    <AppContext.Provider
      value={{
        githubUser,
        repos,
        folowers,
        requestLimit,
        isError,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
