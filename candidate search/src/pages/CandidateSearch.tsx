import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      if (data.length) {
        const enrichedCandidates = await Promise.all(
          data.map((user: { login: string }) => searchGithubUser(user.login))
        );

        const validCandidates = enrichedCandidates.filter((candidate) => candidate !== null);
        setCandidates(validCandidates);
        setCurrentCandidate(validCandidates[0] || null);
      }
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    if (currentCandidate) {
      const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...saved, currentCandidate]));
      rejectCandidate();
    }
  };

  const rejectCandidate = () => {
    const remainingCandidates = candidates.slice(1);
    setCandidates(remainingCandidates);
    setCurrentCandidate(remainingCandidates[0] || null);
  };

  if (!currentCandidate) {
    return <p>No more candidates available.</p>;
  }

  return (
    <main className="candidate-container">
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img
          src={currentCandidate.avatar_url}
          alt="Candidate Avatar"
          className="candidate-avatar"
        />
        <div className="candidate-details">
          <h2>
            {currentCandidate.login} (
            <span>{currentCandidate.login}</span>)
          </h2>
          <p><strong>Location:</strong> {currentCandidate.location || 'N/A'}</p>
          <p><strong>Email:</strong> {currentCandidate.email || 'N/A'}</p>
          <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
          <p><strong>Bio:</strong> {currentCandidate.bio || 'N/A'}</p>
        </div>
        <div className="candidate-actions">
          <button className="reject-button" onClick={rejectCandidate}>-</button>
          <button className="accept-button" onClick={saveCandidate}>+</button>
        </div>
      </div>
    </main>
  );
};

export default CandidateSearch;
