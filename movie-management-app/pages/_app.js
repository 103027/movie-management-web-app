import '../styles/globals.css';
import Navigation from '../components/Navigation';
import { ThemeProvider } from '../store/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
