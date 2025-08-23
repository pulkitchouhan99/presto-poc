import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import all page components
import About from './about/index';
import Careers from './about/careers';
import TermsOfService from './terms-of-service';

describe('Pages', () => {
  const pages = [
    { name: 'About', component: About },
    { name: 'Careers', component: Careers },
    { name: 'Terms of Service', component: TermsOfService },
  ];

  it.each(pages)('$name page should have page-heading', ({ component: Component }) => {
    render(<Component />);

    const pageHeading = screen.getByTestId('page-heading');
    expect(pageHeading).toBeInTheDocument();
  });
});
