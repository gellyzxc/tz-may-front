import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.scss";
import { privateApiInstance } from "../http-common";
import echo from "../echo";
import { useAuth } from "../providers/AuthProvider";

export default function Dashboard() {
  const [pageData, setPageData] = useState();
  const { logout } = useAuth()

  const handlePaginate = (link) => {
    const params = new URLSearchParams(link.split("?")[1]);
    privateApiInstance
      .get(`/post?page=${params.get("page")}`)
      .then((response) => {
        setPageData(response.data);
      });
  };

  useEffect(() => {
    echo.private("global").listen(".updates", (data) => {
      alert('Пост создан')
      console.log(data.data)
    });
  }, [null]);

  useEffect(() => {
    privateApiInstance.get("/post").then((response) => {
      setPageData(response.data);
    });
  }, [null]);

  return (
    <div className={styles.base}>
      <button onClick={() => logout()}>logout</button>
      <div className={styles.posts}>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>user name</th>
            </tr>
          </thead>
          <tbody>
            {!!pageData &&
              pageData.data.map((item) => (
                // <div>{item.title}</div>
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <th>{item.title}</th>
                  <th>{item.user.name}</th>
                </tr>
              ))}
          </tbody>
        </table>
        <div className={styles.links}>
          {!!pageData &&
            pageData.links.map((item) => (
              <button
                key={item.label}
                onClick={() => handlePaginate(item.url)}
                disabled={!item.url}
                className={item.active ? "active" : ""}
              >
                {item.label}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
