import Head from 'next/head';
import Image from 'next/legacy/image';
import UseFormInput from '../../components/components/UseFormInput';
import { FilesGeneric, GenericUser, SoftwareLogin } from '@heathmont/moon-icons-tw';
import Card from '../../components/components/Card';
import { Avatar, Button, IconButton } from '@heathmont/moon-core-tw';
import { useEffect, useState } from 'react';
import { useIPFSContext } from '../../contexts/IPFSContext';
import { toast } from 'react-toastify';
import validator from 'validator';
import Required from '../../components/components/Required';
import { useRouter } from 'next/router';
import { useAptosContext } from '../../contexts/AptosContext';
import Cookies from 'js-cookie';

declare let window: any;
export default function Register() {
  const [mounted, setMounted] = useState(false);
  const {sendTransaction,signerAddress,showToast} = useAptosContext()

  const { UploadBlob } = useIPFSContext();
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  //Input fields
  const [image, set_Image] = useState({} as File);
  const [Fullname, FullnameInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: 'Add name',
    id: ''
  });

  const [Email, EmailInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: 'Add email',
    id: ''
  });

  const [Password, PasswordInput] = UseFormInput({
    defaultValue: '',
    type: 'password',
    placeholder: 'Add password',
    id: ''
  });

  function chooseImage() {
    let input = document.createElement('input');
    input.type = 'file';
    input.removeAttribute('multiple');
    input.setAttribute('accept', 'image/*');
    input.onchange = () => {
      set_Image((input as HTMLInputElement).files[0]);
    };
    input.click();
  }
  useEffect(()=>{
    setMounted(true);
  },[])
  
  const fetchDataStatus = async () => {
    if (await window.aptos.isConnected()) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }

  };
  useEffect(() => {
    setInterval(() => {
      
       fetchDataStatus();
     }, 1000);
 }, []);
  if (!mounted) return <></>;

  async function registerAccount() {
    const ToastId = toast.loading('Uploading IPFS ...');
    const metadata: string = image.type ? await UploadBlob(image, true) : '';
    toast.update(ToastId, { render: 'Registering User...', isLoading: true });

    const doAfter = () => {
      Cookies.remove('loggedin'); // covers localhost
      Cookies.remove('user_id'); // covers localhost

      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    };




    await sendTransaction(signerAddress,"registerUser",[Fullname, Email, Password, metadata,signerAddress]);
      showToast( ToastId, 'Registered Successfully!', doAfter);

  }

  function isDisabled() {
    return !(Fullname && validator.isEmail(Email) && Password);
  }

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

  const AptosInstalled = () =>  typeof window?.aptos !== "undefined";



  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="DAOnation - Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center flex-col gap-8">
        <div className="gap-8 flex flex-col w-full bg-gohan pt-10 pb-6 border-beerus border">
          <div className="container flex w-full justify-between">
            <div className="flex flex-col gap-1 overflow-hidden">
              <h1 className="text-moon-32 font-bold">{!isConnected ? <>Connect your wallet</> : <>Register your account</>} </h1>
              <h3 className="flex gap-2 whitespace-nowrap">
                <>It just takes a couple of clicks</>
              </h3>
            </div>
          </div>
        </div>

        {!isConnected ? (
          <>{ (AptosInstalled() ? <>
            <Card className="max-w-[480px] w-full">
              <div className="flex w-full flex-col gap-10">
                <div className="flex items-center w-full justify-between">
                  <div className="rounded-moon-s-md border border-beerus p-2 mr-6 min-w-[84px]">
                    <Image height={64} width={64} src="/images/petra.ico" alt="" />
                  </div>
                  <div className="flex flex-col justify-between xs:flex-row xs:w-full">
                    <p className="font-bold text-moon-20 flex-1">Petra Wallet</p>
                    <Button className="min-w-[175px] xs:min-w-0" iconLeft={<SoftwareLogin />} onClick={onConnectAptos}>
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </> : <>
            <Card className="max-w-[480px] w-full">
              <div className="flex w-full flex-col gap-10">
                <div className="flex items-center w-full justify-between">
                  <div className="rounded-moon-s-md border border-beerus p-2 mr-6 min-w-[84px]">
                    <Image height={64} width={64} src="/images/petra.ico" alt="" />
                  </div>
                  <div className="flex flex-col justify-between xs:flex-row xs:w-full">
                    <p className="font-bold text-moon-20 flex-1">Petra Wallet</p>
                    <Button className="min-w-[175px] xs:min-w-0" onClick={onConnectAptos}>
                      Install Petra
                    </Button>
                  </div>
                </div>
              </div>
            </Card></>)}</>
        ) : (
          <>
            <Card className="max-w-[480px] pt-10">
              <div className="flex items-center justify-center flex-col w-full gap-6">
                <div className="flex flex-col gap-6 w-full p-6">
                  <div className="upload">
                    <Avatar className="rounded-full border border-beerus bg-gohan text-moon-120 h-32 w-32">{image.type ? <img src={URL.createObjectURL(image)} className="h-full w-full object-cover" /> : <GenericUser className="h-24 w-24 text-trunks" />}</Avatar>
                    <div className="flex items-center justify-center round">
                      <IconButton className="rounded-moon-i-sm" size="xs" icon={<FilesGeneric className="text-gohan" color="#ffff" />} onClick={chooseImage}></IconButton>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 w-full">
                  <div className="flex flex-col gap-2">
                    <h6>
                      Full Name
                      <Required />
                    </h6>
                    {FullnameInput}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h6>
                      Email
                      <Required />
                    </h6>
                    {EmailInput}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h6>
                      Password
                      <Required />
                    </h6>
                    {PasswordInput}
                  </div>
                </div>

                <div className="flex w-full justify-end">
                  <Button id="RegisterBTN" onClick={registerAccount} disabled={isDisabled()}>
                    Register
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </>
  );
}
