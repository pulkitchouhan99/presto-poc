import { DataBridgeVersion, RemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';

const Meta: RemoteBoundaryComponent = () => {
  return (
    <>
      <title>My Dispensary</title>
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "My Dispensary",
          "url": "https://mydispensary.com"
        }
      `}</script>
    </>
  );
};

Meta.DataBridgeVersion = DataBridgeVersion;

export default Meta;
