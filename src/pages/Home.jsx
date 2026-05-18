import { Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api';

export default function Home() {
  const [roomCode, setRoomCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const res = await fetch(`${API_URL}/rooms`, { method: 'POST' });
      const data = await res.json();
      sessionStorage.setItem(`presenter_${data.code}`, data.presenterId);
      navigate(`/presenter/${data.code}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create room');
    }
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomCode && displayName) {
      sessionStorage.setItem('displayName', displayName);
      navigate(`/room/${roomCode.toUpperCase()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      
        <h1 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm mb-6">
            Real-time collaborative polling platform
          </h1>
       <p className="text-muted mb-8 max-w-xl text-center mb-4">
            Create engaging live polls for conferences, workshops, and team
            discussions. Audience members vote in real time while presenters
            monitor live analytics instantly.
          </p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h2>Join a Poll</h2>
          <form onSubmit={joinRoom}>
            <div className="input-group">
              <label>Room Code</label>
              <input 
                type="text" 
                className="input-control" 
                value={roomCode} 
                onChange={e => setRoomCode(e.target.value)}
                placeholder="e.g. AXKF29"
                required
              />
            </div>
            <div className="input-group">
              <label>Your Name</label>
              <input 
                type="text" 
                className="input-control" 
                value={displayName} 
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <button type="submit" className="btn" style={{width: '100%'}}>Join Room</button>
          </form>
        </div>

        <div className="card flex flex-col justify-center items-center text-center">
          <h2>Are you a presenter?</h2>
          <p className="text-muted mb-4">Create a room to start hosting real-time polls with your audience.</p>
          <button onClick={createRoom} className="btn" style={{width: '100%'}}>Create New Room</button>
        </div>
      </div>
    </div>
  );
}
