import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    const response = await api.get(`/repositories`);

    setRepos(response.data);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {
      title: "Título",
      url: "https://github.com/user/title",
      techs: [],
    });

    const { data: newRepo } = response;

    setRepos([...repos, newRepo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepos(repos.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
