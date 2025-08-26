import { useEffect, useState } from 'react';
import { RemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';

const RuntimeFetchTest: RemoteBoundaryComponent = () => {
  const [testResult, setTestResult] = useState<string>('Testing runtime fetch...');
  const [fetchData, setFetchData] = useState<unknown>(null);

  useEffect(() => {
    // Test 1: Can we use fetch?
    if (typeof fetch === 'undefined') {
      setTestResult('❌ Fetch API not available');
      return;
    }

    // Test 2: Try to fetch from Strapi
    const testFetch = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/intro-sections', {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ea09a8a831de8d4b8dbeac67cce8c263289accb11bd647fd9d9d89ca14d788078eba62ea7d5dd1234e1943f11401e775106ac1c952292cfdc652b25c7d8b3f77ee18f78b6072ee4d516839c7cd4bde40a3745c0727be8ab1518e0430a6057622efedd008d2c6bb350f2f779eba11c52ffd12dc40dc0418a116f3ed6dde96b8a1',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTestResult('✅ Runtime fetch WORKS! Dutchie allows HTTP calls!');
          setFetchData(data);
        } else {
          setTestResult(`⚠️ Fetch returned ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setTestResult(`❌ Fetch failed: ${errorMessage}`);
        console.error('Runtime fetch test error:', error);
      }
    };

    testFetch();
  }, []);

  return (
    <div
      style={{
        padding: '2rem',
        background: '#f0f0f0',
        margin: '2rem 0',
        borderRadius: '8px',
      }}
    >
      <h3>🧪 Runtime Fetch Test</h3>
      <p>
        <strong>Result:</strong> {testResult}
      </p>
      {fetchData && (
        <details>
          <summary>Fetched Data</summary>
          <pre style={{ fontSize: '0.8rem' }}>{JSON.stringify(fetchData, null, 2)}</pre>
        </details>
      )}
    </div>
  );
};

RuntimeFetchTest.DataBridgeVersion = '1';

export default RuntimeFetchTest;
