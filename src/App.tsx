import './styles/normalize.css';
import { PreviewProvider } from './preview/context';
import { Content } from './preview/content';

const App = () => {
  return (
    <PreviewProvider>
      <Content />
    </PreviewProvider>
  );
};

export default App;
