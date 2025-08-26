import { useEffect, useState } from 'react';

const AuthCallback = () => {
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Get tokens from URL
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const idToken = urlParams.get('id_token');

        console.log('OAuth callback received:', {
          accessToken: accessToken ? 'present' : 'missing',
          idToken: idToken ? 'present' : 'missing'
        });

        if (idToken) {
          // Decode JWT to get user info (basic decode, no verification needed for display)
          const payload = JSON.parse(atob(idToken.split('.')[1]));
          console.log('User info from Google:', payload);

          // Store user info in localStorage (simulating Strapi response)
          const userData = {
            jwt: accessToken || idToken, // Use access token as JWT for now
            user: {
              id: payload.sub,
              username: payload.name || payload.email.split('@')[0],
              email: payload.email,
              confirmed: payload.email_verified,
              provider: 'google'
            }
          };

          // Store in localStorage like Strapi would
          localStorage.setItem('strapi-jwt', userData.jwt);
          localStorage.setItem('strapi-user', JSON.stringify(userData.user));

          setStatus('✅ Login successful! Redirecting...');

          // Redirect after short delay
          setTimeout(() => {
            if (window.opener) {
              // If opened in popup, notify parent and close
              window.opener.postMessage({ type: 'AUTH_SUCCESS', user: userData.user }, '*');
              window.close();
            } else {
              // Regular redirect to home
              window.location.href = '/?login=success';
            }
          }, 2000);

        } else if (accessToken) {
          // If we only have access token, try to get user info from Google
          setStatus('Getting user information...');
          
          const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (userResponse.ok) {
            const userInfo = await userResponse.json();
            console.log('User info from Google API:', userInfo);

            const userData = {
              jwt: accessToken,
              user: {
                id: userInfo.id,
                username: userInfo.name || userInfo.email.split('@')[0],
                email: userInfo.email,
                confirmed: userInfo.verified_email,
                provider: 'google'
              }
            };

            localStorage.setItem('strapi-jwt', userData.jwt);
            localStorage.setItem('strapi-user', JSON.stringify(userData.user));

            setStatus('✅ Login successful! Redirecting...');
            
            setTimeout(() => {
              if (window.opener) {
                window.opener.postMessage({ type: 'AUTH_SUCCESS', user: userData.user }, '*');
                window.close();
              } else {
                window.location.href = '/?login=success';
              }
            }, 2000);
          } else {
            throw new Error('Failed to get user info from Google');
          }
        } else {
          // Check for error
          const error = urlParams.get('error');
          if (error) {
            setStatus('❌ Authentication failed: ' + error);
            console.error('OAuth error:', error);
            setTimeout(() => {
              window.location.href = '/?error=' + error;
            }, 3000);
          } else {
            setStatus('❌ No authentication tokens received');
            setTimeout(() => {
              window.location.href = '/?error=no_tokens';
            }, 3000);
          }
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('❌ Authentication error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        setTimeout(() => {
          window.location.href = '/?error=callback_failed';
        }, 3000);
      }
    };

    handleGoogleCallback();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Google Authentication</h2>
      <p>{status}</p>
      {status.includes('successful') && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          Welcome! You'll be redirected shortly.
        </p>
      )}
    </div>
  );
};

export default AuthCallback;