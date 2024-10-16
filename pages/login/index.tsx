import Head from 'next/head';
import { useEffect, useState } from 'react';
import LoginCard from '../../components/components/LoginCard';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// import { useConnectWallet } from '@subwallet-connect/react';
import useEnvironment from '../../contexts/EnvironmentContext';

declare let window:any;
export default function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  const { getCommunityBranding, isSubdomain } = useEnvironment();

  const router = useRouter();

  useEffect(()=>{
    setMounted(true);
  },[])


  useEffect(() => {
    if (isLogged && isConnected) {
      if (isSubdomain()) {
        window.location.href = `/daos/${getCommunityBranding().apsosReferenceId}`;
      } else {
        window.location.href = '/joined';
      }
    }
  }, [isConnected, router,isLogged]); // Dependency array

  const fetchDataStatus = async () => {
    if (Cookies.get('loggedin' )== "true") setIsLogged(true);
    if (await window.aptos.isConnected()) {
      setStep(2);
      setIsConnected(true);
    } else {
      setStep(1);
      setIsConnected(false);
    }

  };
  useEffect(() => {
    setInterval(() => {
      
       fetchDataStatus();
     }, 1000);
 }, []);
  if (!mounted) return <></>;


  const AptosInstalled = () =>  typeof window?.aptos !== "undefined";

  async function onConnectAptos() {
    if (!AptosInstalled()) {
      window.open('https://chromewebstore.google.com/detail/ejjladinnckdgjemekebdpeokbikhfci','blank').focus();
      return 
    }
    await window.aptos.connect();

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 2);

    setIsConnected(true);
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="DAOnation - Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`gap-8 flex w-full bg-gohan pt-10 pb-6 border-beerus border`}>
        <div className="container flex flex-col gap-2 w-full justify-between">
          <h1 className="text-moon-32 font-bold">Login to your account</h1>
          <p>Step {step} of 2</p>
        </div>
      </div>
      <div className="container flex flex-col items-center !pt-8 gap-10">{<LoginCard  setIsLogged={setIsLogged} step={step} isConnected={isConnected} AptosInstalled={AptosInstalled} onConnectAptos={onConnectAptos} />}</div>
    </>
  );
}
