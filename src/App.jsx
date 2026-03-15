import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // محاولة الاتصال بتليجرام
    try {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
          setUser(tg.initDataUnsafe.user);
        }
      } else {
        console.log('Telegram WebApp not available');
      }
    } catch (error) {
      console.log('Error initializing Telegram:', error);
    }
  }, []);

  const fetchQualities = () => {
    if (!videoUrl) {
      alert('من فضلك أدخل رابط الفيديو');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setQualities(['144p', '360p', '720p', '1080p', 'mp3']);
      setIsLoading(false);
    }, 1500);
  };

  const watchAd = () => {
    window.open('https://omg10.com/4/10732395', '_blank');
    setTimeout(() => {
      setDownloadLink('https://ouo.io/api/SaohjboC?s=https://example.com/video.mp4');
    }, 5000);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎬 Video Downloader</h1>
      {user && <p>Welcome {user.first_name}!</p>}
      
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Paste video URL"
        style={{ width: '80%', padding: '10px', margin: '10px' }}
      />
      
      <button onClick={fetchQualities} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Get Qualities'}
      </button>

      {qualities.length > 0 && (
        <div>
          <h3>Select Quality:</h3>
          {qualities.map(q => (
            <button
              key={q}
              onClick={() => setSelectedQuality(q)}
              style={{
                margin: '5px',
                padding: '10px',
                background: selectedQuality === q ? '#4CAF50' : '#ddd'
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {selectedQuality && (
        <button
          onClick={watchAd}
          style={{
            margin: '20px',
            padding: '15px 30px',
            background: '#FF9800',
            color: 'white',
            fontSize: '18px'
          }}
        >
          Watch Ad to Download
        </button>
      )}

      {downloadLink && (
        <div>
          <h3>Download Link:</h3>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            {downloadLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;