import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/header';
import { ChakraProvider } from '@chakra-ui/react';

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe('Header Component', () => {
  it('renders the header with logo and navigation items', () => {
    renderWithChakra(<Header />);
    
    const logo = screen.getByLabelText('linktrim');
    expect(logo).toBeInTheDocument();

    const navItems = ['Home', 'Features', 'Pricing'];
    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('toggles mobile menu when the hamburger icon is clicked', async () => {
    renderWithChakra(<Header />);

    const hamburgerIcon = screen.getByLabelText('Open menu');
    fireEvent.click(hamburgerIcon);

    // Check if the menu opens
    const closeIcon = screen.getByLabelText('Close menu');
    expect(closeIcon).toBeInTheDocument();

    const mobileNav = screen.getByRole('navigation');
    expect(mobileNav).toBeInTheDocument();

    // Close the menu
    fireEvent.click(closeIcon);

    // Wait for the navigation to be removed from the document
    await waitFor(() => expect(screen.queryByRole('navigation')).not.toBeInTheDocument());
  });

  it('navigates to the correct section when a nav item is clicked', () => {
    renderWithChakra(<Header />);

    const featuresLink = screen.getByText('Features');
    fireEvent.click(featuresLink);

    expect(featuresLink).toHaveAttribute('aria-current', 'page');
  });

  it('displays login and sign-up buttons correctly', () => {
    renderWithChakra(<Header />);

    const loginButton = screen.getByText('Login');
    const signupButton = screen.getByText('Get Started');

    expect(loginButton).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  it('displays the logo and toggle button correctly on mobile', () => {
    renderWithChakra(<Header />);

    const hamburgerIcon = screen.getByLabelText('Open menu');
    expect(hamburgerIcon).toBeInTheDocument();
  });
});