import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IPFSProvider } from '../contexts/IPFSContext';
import { EnvironmentProvider } from '../contexts/EnvironmentContext';
import Header from '../components/layout/Header';
import '../public/css/daos.css';
import '../public/css/ideas.css';
import '../public/output.css';
import '../public/theme.css';

import { AptosProvider } from '../contexts/AptosContext';

function MyApp({ Component, pageProps }) {
  return (
    <IPFSProvider>
     <AptosProvider>
        <ToastContainer hideProgressBar={false} position="top-right" autoClose={3000} newestOnTop={false} closeOnClick rtl={false} draggable pauseOnHover theme="light" />
        <EnvironmentProvider>
          <Header />
          <Component {...pageProps} />
        </EnvironmentProvider>
      </AptosProvider>
    </IPFSProvider>
  );
}

export default MyApp;
