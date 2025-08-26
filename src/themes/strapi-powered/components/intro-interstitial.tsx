import React from 'react';
import { RemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';
import IntroSection from './page-sections/intro-section';
import { mockStrapiContent } from '../data/strapi-types';
import { useStrapiIntroSection } from '../hooks/useStrapiContent';

const IntroInterstitial: RemoteBoundaryComponent = () => {
  // Runtime CMS fetching - updates immediately without rebuilds!
  const { data: strapiData, loading, error } = useStrapiIntroSection();

  // Debug logs
  console.log('IntroSection - Strapi data:', strapiData);
  console.log('IntroSection - Loading:', loading);
  console.log('IntroSection - Error:', error);

  // Use Strapi data if available, fallback to mock data
  const introData = strapiData?.[0] || mockStrapiContent.introSection;

  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: '#fff',
        }}
      >
        <p>Loading content...</p>
      </div>
    );
  }

  // Show error state with fallback content
  if (error) {
    console.warn('Failed to load Strapi content, using fallback:', error);
  }

  return (
    <>
      {/* Debug button - remove after testing */}
      <div style={{ padding: '1rem', background: '#f0f0f0', textAlign: 'center' }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.5rem 1rem',
            background: '#4ade80',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Refresh Page to Get Latest Strapi Content
        </button>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Last fetched: {new Date().toLocaleTimeString()}</p>
      </div>
      <IntroSection data={introData} />
    </>
  );
};

IntroInterstitial.DataBridgeVersion = '1';

export default IntroInterstitial;
