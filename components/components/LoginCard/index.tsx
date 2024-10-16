import Image from 'next/legacy/image';
import Card from '../Card';
import { Button } from '@heathmont/moon-core-tw';
import { SoftwareLogin } from '@heathmont/moon-icons-tw';
import UseFormInput from '../UseFormInput';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useAptosContext } from '../../../contexts/AptosContext';

const LoginCard = ({ step, onConnectAptos, isConnected, setIsLogged,AptosInstalled }) => {
  const {ReadContract,EasyToast} = useAptosContext()
  const [Email, EmailInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: 'Email',
    id: ''
  });

  const [Password, PasswordInput] = UseFormInput({
    defaultValue: '',
    type: 'password',
    placeholder: 'Password',
    id: ''
  });

  async function OnClickLoginStep1() {
    const ToastId = toast.loading('Logging in  ...');

    let userid = await ReadContract( ("Login"), [Email, Password]);

    if (userid !="False") {
      Cookies.set('user_id', userid.toString(), { expires: 30, path: '/', sameSite: 'Lax' }); // covers localhost
      Cookies.set('loggedin', 'true', { expires: 30, path: '/', sameSite: 'Lax' }); // covers localhost
      EasyToast('Logged in Successfully!', 'success', true, ToastId.toString());
      setIsLogged(true);
    }else{
      EasyToast('Incorrect email or password!', 'error', true, ToastId.toString());
    }
  }

  function isDisabled() {
    return !(Email && Password);
  }


  const LoginForm = () => (
    <Card className="!max-w-[480px]">
      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-1 justify-between items-center relative text-moon-16">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <h6>Email</h6>
              {EmailInput}
            </div>
            <div className="flex flex-col gap-2">
              <h6>Password</h6>
              {PasswordInput}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button onClick={OnClickLoginStep1} disabled={isDisabled()}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );

  const ConnectWalletButton = () => (
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
  );

  const InstallWalletButton = () => (
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
  );
  return (
    <>
      { !isConnected && <div className="flex flex-col gap-4 w-full items-center">{AptosInstalled() ? ConnectWalletButton():InstallWalletButton()}</div>}
      { LoginForm()}
    </>
  );
};

export default LoginCard;
