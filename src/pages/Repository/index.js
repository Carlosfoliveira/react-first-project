import React, { useEffect, useState } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

const Repository = ({ match }) => {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const repoName = decodeURIComponent(match.params.repository);

      const [repositoryFromApi, issuesFromApi] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(repositoryFromApi.data);
      setIssues(issuesFromApi.data);
      setLoading(false);

      console.log(repositoryFromApi);
      console.log(issuesFromApi);
    }
    fetchData();
  }, []);

  return (
    <h1>
      Repository
    </h1>
  );
};

export default Repository;
