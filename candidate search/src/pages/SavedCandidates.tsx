import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

// State to store the list of saved candidates
const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Loads saved candidates from local storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  // Removes candidates from the list and updates the local storage
  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  // Displays a message if there are no saved candidates
  if (!savedCandidates.length) {
    return <p>No saved candidates available.</p>;
  }

  // Renders the table with the saved candidates with a remove button for each candidate in the list
  return (
    <div className="table-container">
      <h1 className="page-title">Potential Candidates</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map(candidate => (
            <tr key={candidate.login}>
              <td>
                <img
                  src={candidate.avatar_url}
                  alt={`${candidate.login}'s avatar`}
                  className="avatar-image"
                />
              </td>
              <td>{candidate.login}</td>
              <td>{candidate.location || 'N/A'}</td>
              <td>{candidate.email || 'N/A'}</td>
              <td>{candidate.company || 'N/A'}</td>
              <td>{candidate.bio || 'N/A'}</td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => removeCandidate(candidate.login)}
                >
                  &minus;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
