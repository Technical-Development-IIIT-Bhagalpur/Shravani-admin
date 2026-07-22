import React, { useState, useEffect } from 'react';
import FeedCard from '../components/FeedCard.jsx';
import { useAuth } from 'react-oidc-context';

const FeedsPage = () => {
  const auth = useAuth();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch('https://d35kcn9p6vo37w.cloudfront.net/api/images', {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const formattedFeeds = data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            imageUrl: item.s3_url,
          }));
          setFeeds(formattedFeeds);
        } else {
          console.error('Failed to fetch feeds');
        }
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };

    if (auth.isAuthenticated && auth.user?.access_token) {
      fetchFeeds();
    }
  }, [auth.isAuthenticated, auth.user?.access_token]);

  // Modal State & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset fields on close
    setNewTitle('');
    setNewDescription('');
    setSelectedFile(null)
  };

  const handleCreateFeed = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('description', newDescription);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await fetch('https://d35kcn9p6vo37w.cloudfront.net/api/images', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        
        const newFeed = {
          id: data.id, // Using the ID returned from the server
          title: newTitle,
          description: newDescription,
          imageUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
        };

        setFeeds([...feeds, newFeed]);
        handleCloseModal();
      } else {
        console.error('Failed to create feed');
      }
    } catch (error) {
      console.error('Error creating feed:', error);
    }
  };

  const handleDeleteFeed = async (id) => {
    try {
      const response = await fetch(`https://d35kcn9p6vo37w.cloudfront.net/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });

      if (response.ok) {
        setFeeds(feeds.filter(feed => feed.id !== id));
      } else {
        console.error('Failed to delete feed');
      }
    } catch (error) {
      console.error('Error deleting feed:', error);
    }
  };

  // --- Inline Styles matching your theme ---
  const pageContainer = { padding: '32px', width: '100%' };
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' };
  const titleStyle = { fontSize: '28px', fontWeight: 'bold', color: 'var(--color-primary-text)', margin: 0 };
  
  const createBtnStyle = {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '15px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  };

  // Modal Specific Styles
  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(30, 42, 71, 0.6)', // dark transparent overlay using your primary text tint
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
  };

  const modalTitle = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'var(--color-primary-text)',
    marginTop: 0,
    marginBottom: '24px',
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--color-primary-text)',
    marginBottom: '6px',
  };

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-primary-text)',
    fontSize: '15px',
    outline: 'none',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit',
  };

  const actionsContainer = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  };

  const cancelBtnStyle = {
    backgroundColor: 'transparent',
    color: 'var(--color-secondary-text)',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  };

  const submitBtnStyle = {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  };

  return (
    <div style={pageContainer}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Feeds Management</h1>
        <button style={createBtnStyle} onClick={handleOpenModal}>
          + Create Feed
        </button>
      </div>

      {feeds.length === 0 ? (
        <p style={{ color: 'var(--color-secondary-text)' }}>No feeds yet. Click "+ Create Feed" to begin.</p>
      ) : (
        <div style={gridStyle}>
          {feeds.map(feed => (
            <FeedCard 
              key={feed.id} 
              feed={feed} 
              onDelete={handleDeleteFeed} 
            />
          ))}
        </div>
      )}

      {/* 🔮 CUSTOM MODAL COMPONENT */}
      {isModalOpen && (
        <div style={backdropStyle} onClick={handleCloseModal}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalTitle}>Create New Feed</h2>
            <form onSubmit={handleCreateFeed}>
              
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Feed Title <span style={{color: 'var(--color-danger)'}}>*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekly Insights"
                  style={inputStyle}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Description</label>
                <textarea
                  placeholder="Provide a brief summary of the feed content..."
                  style={textareaStyle}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Image URL</label>
                  <input
                    type="file"
                    accept="image/*"
                    style={inputStyle}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setSelectedFile(file);
                    }}
                  />
              </div>

              <div style={actionsContainer}>
                <button type="button" style={cancelBtnStyle} onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit"  style={submitBtnStyle}>
                  Create
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedsPage;