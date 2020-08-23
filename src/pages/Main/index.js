import React, { useState } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import {
  Container, Form, SubmitButton, List,
} from './styles';

const Main = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const response = await api.get(`repos/${newRepo}`);
    setLoading(false);
    const data = {
      name: response.data.full_name,
    };

    setRepositories([...repositories, data]);
    setNewRepo('');
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading}>
          { loading ? (<FaSpinner color="#FFF" size={14} />)
            : (<FaPlus color="#FFF" size={14} />)}

        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repository) => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <a href="">Detalhes</a>
          </li>
        ))}

      </List>
    </Container>
  );
};

export default Main;
