import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Welcome to Heatmap v2!
      </h2>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>User Info:</h3>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>Email:</strong> {user?.email}
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>User ID:</strong> {user?.id}
        </p>
        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          <strong>Last Sign In:</strong> {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
        </p>
      </div>
      
      <div style={{
        backgroundColor: '#e7f3ff',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Chrome Extension Features:</h3>
        <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '14px' }}>
          <li>✅ Authentication working</li>
          <li>🔧 Heatmap functionality (coming soon)</li>
          <li>📊 Analytics dashboard (coming soon)</li>
          <li>⚙️ Settings panel (coming soon)</li>
        </ul>
      </div>
      
      <button
        onClick={handleSignOut}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Sign Out
      </button>
    </div>
  )
}
