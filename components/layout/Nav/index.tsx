import Image from 'next/legacy/image';
import { Avatar, Button, Dropdown, MenuItem } from '@heathmont/moon-core-tw';
import { useEffect, useState } from 'react';
import NavItem from '../../components/NavItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CreateDaoModal from '../../../features/CreateDaoModal';
import useEnvironment from '../../../contexts/EnvironmentContext';
import { GenericEdit, GenericLogOut, GenericUser, ShopWallet } from '@heathmont/moon-icons-tw';
import { ApiCommunity } from '../../../data-model/api-community';
import Cookies from 'js-cookie';
import { useAptosContext } from '../../../contexts/AptosContext';
import { AptosClient, AptosAccount, CoinClient, FaucetClient } from "aptos";
import config from '../../../contexts/json/config.json';
let running = false;
let changedPath = true;

declare let window: any;

export function Nav(): JSX.Element {
  const { userInfo, aptosClient, signerAddress } = useAptosContext();
  const [acc, setAcc] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [logo, setLogo] = useState('');
  const [user_id, setUser_id] = useState('-1');
  const [Balance, setBalance] = useState('');
  const [count, setCount] = useState(0);
  const [isSigned, setSigned] = useState(false);
  const [communityBranding, setCommunityBranding] = useState<ApiCommunity>(null);
  const [showCreateDaoModal, setShowCreateDaoModal] = useState(false);
  const [hasJoinedCommunities, setHasJoinedCommunities] = useState(true);
  const { getCurrency, setCurrency, isServer, getCommunityBranding, isSubdomain } = useEnvironment();

  const router = useRouter();

  async function fetchInfo() {
   
    if (Cookies.get('loggedin') === 'true') {
      try {
        let isConnected = await window?.aptos?.isConnected();
        if ( isConnected && aptosClient ) {
          let aptos_account = (await window.aptos.account()).address;
          console.log(userInfo)
          if (aptos_account !== false && typeof userInfo !=="undefined" &&  userInfo != null && userInfo?.full_name != null) {
            const client = new AptosClient(config.network);
            const coinClient = new CoinClient(client); // <:!:section_1a


            let Balance = Number(await coinClient.checkBalance(aptos_account));
            setBalance(Number(Balance) / 1e8 + ' APT');
            if (!isSigned) setSigned(true);

            setAcc(userInfo?.full_name?.toString());
            setLogo(userInfo?.img_ipfs?.toString());
            setUser_id(window.userid);
            window.document.getElementById('withoutSign').style.display = 'none';
            window.document.getElementById('withSign').style.display = '';
            running = false;
            changedPath = false;
            return;
          }
        } else {
          running = false;
          changedPath = false;
          return;
        }
      } catch (e) {
        running = false;
        changedPath = false;
        return;
      }
    } else {
      if (location.pathname !== '/' && location.pathname !== '/add-data' && location.pathname !== '/login' && location.pathname !== '/register') {
        window.location.href = '/';
      }
    }
  }
  useEffect(() => {
    if (!running) {
      if (!isSigned || acc === '' || changedPath) {
        running = true;
        fetchInfo();
      }
    }
    if (acc !== '') {
      running = false;
    }
  }, [count, router.pathname]);

  useEffect(() => {
    changedPath = true;
  }, [router.pathname]);

  useEffect(() => {
    if (aptosClient) {
      setCommunityBranding(getCommunityBranding());
      fetchContractData();
    }
  }, [getCommunityBranding(), aptosClient]);

  setInterval(() => {
    if (!isServer()) {
      if (document.readyState === 'complete' && !running) {
        setCount(count + 1);
      }
    }
  }, 1000);

  async function fetchContractData() {
    const daoId = getCommunityBranding()?.apsosReferenceId;

    try {
      // if (daoId === undefined) return;
      // const element = await api._query.daos.daoById(Number(daoId));
      // const daoObject = JSON.parse(element['__internal__raw'].daoUri.toString());
      // setIsOwner(Number(daoObject.properties.user_id.description) === Number(window.userid));
      // return element['__internal__raw'].daoUri.toString();
    } catch (e) { }
  }

  function onClickDisConnect() {
    router.push('/logout');
  }

  function closeModal() {
    setShowCreateDaoModal(false);
  }
  function openModal() {
    setShowCreateDaoModal(true);
  }

  return (
    <>
      <nav className="main-nav w-full flex justify-between items-center">
        <ul className="flex justify-between items-center w-full">
          {isSigned && !communityBranding && (
            <span className="hidden sm:inline-flex">
              {hasJoinedCommunities && <NavItem highlight={router.pathname === '/joined'} link="/joined" label="Joined charities" />}
              <NavItem highlight={router.pathname === '/daos'} link="/daos" label="Charities" />
              <NavItem label="Create Your Charity" onClick={openModal} />
              <NavItem highlight={router.pathname === '/events'} link="/events" label="All events" />
            </span>
          )}

          {isSigned && isSubdomain() && (
            <span className="hidden sm:inline-flex">
              <NavItem highlight={router.pathname === `/daos/${getCommunityBranding().apsosReferenceId}`} link={`/daos/${getCommunityBranding().apsosReferenceId}`} label="Home" />
              <NavItem highlight={router.pathname.includes('/feed')} link={`/daos/${getCommunityBranding().apsosReferenceId}/feed`} label="Feed" />
              <NavItem highlight={router.pathname.includes('/goals')} link={`/goals`} label="Goals" />
              <NavItem highlight={router.pathname.includes('/events')} link={`/events`} label="Events" />
              <NavItem highlight={router.pathname.includes('/members')} link={`/daos/${getCommunityBranding().apsosReferenceId}/members`} label="Members" />
            </span>
          )}

          <li className="Nav walletstatus flex flex-1 justify-end">
            <div className="flex flex-col gap-2 items-center sm:flex-row" id="withoutSign">
              <Link href="/register">
                <Button variant="secondary" className="!bg-transparent w-32">
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-piccolo w-32">Log in</Button>
              </Link>
            </div>

            <div id="withSign" className="wallets" style={{ display: 'none' }}>
              <div className="wallet" style={{ height: 48, display: 'flex', alignItems: 'center' }}>
                <div className="wallet__wrapper gap-4 flex items-center">
                  <div className="wallet__info flex flex-col items-end">
                    <Link href={'/profile/' + user_id} rel="noreferrer" className="max-w-[250px]">
                      <div className="font-medium text-piccolo truncate">{acc}</div>
                    </Link>
                    <div className="font-semibold truncate">{Balance}</div>
                  </div>
                  <Dropdown value={null} onChange={null}>
                    <Dropdown.Trigger>
                      {logo ? (
                        <img src={logo} className="relative overflow-hidden uppercase font-medium flex items-center justify-center bg-cover text-bulma bg-goku h-12 w-12 text-moon-16 [&_.status]:w-4 [&_.status]:h-4 [&_.status]:border-2 rounded-full border-2 border-piccolo" />
                      ) : (
                        // <Avatar imageUrl={logo} size="lg" className="rounded-full border-2 border-piccolo"></Avatar>
                        <Avatar size="lg" className="rounded-full border-2 border-piccolo">
                          {' '}
                          <GenericUser className="text-moon-24" />
                        </Avatar>
                      )}
                    </Dropdown.Trigger>

                    <Dropdown.Options className="bg-gohan w-48 min-w-0">
                      <Dropdown.Option>
                        <Link href={`/profile/${user_id}`} passHref>
                          <MenuItem>
                            <GenericUser className="text-moon-24" />
                            <MenuItem.Title>Go to my profile</MenuItem.Title>
                          </MenuItem>
                        </Link>
                      </Dropdown.Option>
                      <Dropdown.Option>
                        <Link href={``} passHref target="_blank">
                          <MenuItem>
                            <ShopWallet className="text-moon-24" />
                            <MenuItem.Title>Top up your account</MenuItem.Title>
                          </MenuItem>
                        </Link>
                      </Dropdown.Option>
                      {isOwner && (
                        <Dropdown.Option>
                          <Link href={`/daos/${communityBranding.apsosReferenceId}/design`}>
                            <MenuItem>
                              <GenericEdit className="text-moon-24" />
                              <MenuItem.Title>Edit this charity</MenuItem.Title>
                            </MenuItem>
                          </Link>
                        </Dropdown.Option>
                      )}
                      {!isOwner && (
                        <Dropdown.Option>
                          <MenuItem>
                            <GenericLogOut className="text-moon-24" />
                            <MenuItem.Title>Leave this charity</MenuItem.Title>
                          </MenuItem>
                        </Dropdown.Option>
                      )}
                      <Dropdown.Option>
                        <MenuItem onClick={onClickDisConnect}>
                          <GenericLogOut className="text-moon-24" />
                          <MenuItem.Title>Log out</MenuItem.Title>
                        </MenuItem>
                      </Dropdown.Option>
                    </Dropdown.Options>
                  </Dropdown>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <CreateDaoModal open={showCreateDaoModal} onClose={closeModal} />
    </>
  );
}
