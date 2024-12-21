import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // State to store the list of candidates and the current candidate being viewed
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  // Fetches the list of candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      if (data.length) {
        // Fetch the detailed data for each candidate
        const enrichedCandidates = await Promise.all(
          data.map((user: { login: string }) => searchGithubUser(user.login))
        );

        // Filter out the candidates that are invalid
        const validCandidates = enrichedCandidates.filter((candidate) => candidate !== null);
        setCandidates(validCandidates);
        setCurrentCandidate(validCandidates[0] || null);
      }
    };

    fetchCandidates();
  }, []);

  // Saves the current candidate before moving to the next candidate
  const saveCandidate = () => {
    if (currentCandidate) {
      const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...saved, currentCandidate]));
      rejectCandidate();
    }
  };

  // Rejects the current candidate before moving to the next candidate
  const rejectCandidate = () => {
    const remainingCandidates = candidates.slice(1);
    setCandidates(remainingCandidates);
    setCurrentCandidate(remainingCandidates[0] || null);
  };

  // Displays a message if there are no more candidates available
  if (!currentCandidate) {
    return <p>No more candidates available.</p>;
  }

  // Renders all the information on the candidate with accept or reject buttons
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
