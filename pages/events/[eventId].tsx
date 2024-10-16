import { Button, Tabs } from '@heathmont/moon-core-tw';
import { GenericLoyalty, MediaMiceAlternative, MediaPlay, ShopWallet } from '@heathmont/moon-icons-tw';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DonateCoinToEventModal from '../../features/DonateCoinToEventModal';
import DonateNFTModal from '../../features/DonateNFTModal';
import Loader from '../../components/components/Loader';
import Link from 'next/link';
import { Bid, NFT } from '../../data-model/nft';
import NFTCard from '../../components/components/NFTCard';
import BidHistoryModal from '../../features/BidHistoryModal';
import PlaceHigherBidModal from '../../features/PlaceHigherBidModal';
import { Dao } from '../../data-model/dao';
import { toast } from 'react-toastify';

declare let window;
export default function Events() {
  //Variables
  const [nfts, setNfts] = useState([]);
  const [showDonateNftModal, setShowDonateNFTModal] = useState(false);
  const [showDonateCoinModal, setShowDonateCoinModal] = useState(false);
  const [showPlaceHigherBidModal, setShowPlaceHigherBidModal] = useState<NFT | null>(null);
  const [showEmbedVideo, setShowEmbedVideo] = useState(false);
  const [eventID, setEventID] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [isDistributing, setDistributing] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const [EventDAOURI, setEventDAOURI] = useState({} as Dao);
  const [showBidHistoryModal, setShowBidHistoryModal] = useState<NFT | null>(null);

  const router = useRouter();
  const [EventURI, setEventURI] = useState({
    EventId: '',
    daoId: '',
    Title: '',
    Description: '',
    Budget: '',
    End_Date: '',
    TimeFormat: '',
    user_info: {
      fullName: '',
      id: null
    },
    reached: false,
    wallet: '',
    logo: '',
    isOwner: true,
    eventType: '',
    eventStreamUrl: '',
    participantsCount: 0,
    status: ''
  });

  useEffect(() => {
    getEventID();
    fetchContractDataFull();
  }, [router]);

  const isAuction = () => {
    return EventURI.eventType === 'auction';
  };

  function getEventID() {
    const eventIdParam = router.query.eventId;
    if (!eventIdParam) {
      return;
    }
    setEventID(Number(eventIdParam));
  }

  async function fetchContractDataFull() {
    // const eventId = Number(router.query.eventId);
    // setLoading(true);
    // try {
    //   if (api && eventId !== undefined && eventId !== null) {
    //     //Load everything-----------
    //     let allEvents = await GetAllEvents();
    //     let eventURIFull = allEvents.filter((e) => Number(e?.eventId) === eventId)[0];
    //     setNfts(eventURIFull.NFTS);
    //     let allDaos = await GetAllDaos();
    //     let eventDAO = allDaos.filter((e) => e.daoId == eventURIFull.daoId)[0];
    //     setEventDAOURI(eventDAO);
    //     let user_info = await getUserInfoById(Number(eventURIFull.UserId));
    //     eventURIFull.user_info = user_info;
    //     setEventURI(eventURIFull);
    //     setLoading(false);
    //   }
    // } catch (error) {}
    // setLoading(false);
  }

  function closeDonateCoinModal(event) {
    if (event) {
      setShowDonateCoinModal(false);
    }
  }

  function openDonateCoinModal() {
    setShowDonateCoinModal(true);
  }

  function closeDonateNFTModal(event) {
    if (event) {
      setShowDonateNFTModal(false);
    }
  }

  function openDonateNFTModal() {
    setShowDonateNFTModal(true);
  }

  async function distributeNFTs() {
    // setDistributing(true);
    // console.log('======================>Distributing NFT');
    // const ToastId = toast.loading('Distributing NFT ...');
    // async function onSuccess() {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000);
    // }
    // try {
    //   // Distribute NFTs
    //   const txs = [api._extrinsics.events.distributeNfts(Number(eventID))];
    //   await api.tx.utility.batch(txs).signAndSend(userWalletPolkadot, { signer: userSigner }, (status) => {
    //     showToast(status, ToastId, 'Distributed successfully!', () => {
    //       onSuccess();
    //     });
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
    // setDistributing(false);
    // window.location.reload();
  }

  function openEmbedVideo() {
    setShowEmbedVideo(true);
  }

  return (
    <>
      <Head>
        <title>Event</title>
        <meta name="description" content="Event" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex items-center flex-col gap-8`}>
        <div className={`gap-8 flex flex-col w-full bg-gohan pt-10 border-beerus border min-h-[178px]`}>
          <div className="container flex w-full justify-between relative">
            <div className="flex flex-col gap-1">
              <Loader
                loading={loading}
                width={300}
                element={
                  <h5 className="font-semibold">
                    <Link className="text-piccolo" href={`../../${router.query.daoId}`}>
                      {EventDAOURI?.Title}
                    </Link>{' '}
                    Event
                  </h5>
                }
              />
              <Loader loading={loading} width={300} element={<h1 className="text-moon-32 font-bold">{EventURI.Title}</h1>} />
              <Loader
                loading={loading}
                width={600}
                element={
                  <h3 className="flex gap-2 whitespace-nowrap">
                    {isAuction() && <div className="font-bold">{EventURI.status == 'ended' ? 'Ended' : 'In progress'}</div>}
                    <div>•</div>
                    <div className="flex">
                      Created by&nbsp;
                      <a href={'/profile/' + EventURI.user_info.id} className="truncate text-piccolo max-w-[220px]">
                        {EventURI.user_info.fullName}
                      </a>
                    </div>
                  </h3>
                }
              />
            </div>
            <div className="flex flex-col gap-2 absolute top-0 right-0">
              {EventURI.status == 'ended' ? (
                <></>
              ) : (
                <>
                  {!EventURI.isOwner && (
                    <>
                      {isAuction() && (
                        <Button iconLeft={<GenericLoyalty />} onClick={openDonateNFTModal}>
                          Donate NFT
                        </Button>
                      )}
                      <Button iconLeft={<ShopWallet />} variant="secondary" onClick={openDonateCoinModal}>
                        Donate Coin
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {isAuction() && (
            <div className="container">
              <Tabs selectedIndex={tabIndex} onChange={setTabIndex}>
                <Tabs.List>
                  <Tabs.Tab>Description</Tabs.Tab>
                  <Tabs.Tab>NFT's on auction ({nfts.length})</Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </div>
          )}
        </div>
        <p className="container">{EventURI.Description}</p>

        {isAuction() && tabIndex === 0 && (
          <div className="container mt-[-2rem] w-full flex gap-6">
            <div className="w-full max-w-[476px] h-[476px] overflow-hidden relative">
              <Image unoptimized={true} objectFit="cover" layout="fill" className="rounded-xl object-cover" src={EventURI.logo} alt="" />
            </div>
            <div className="flex flex-col gap-5 bg-gohan rounded-xl w-full max-w-[300px] items-center p-6 pt-10 shadow-moon-lg">
              <GenericLoyalty className="text-hit text-moon-48" />
              <div className="font-bold text-moon-20">
                Raised DOT {EventURI.reached} of {EventURI.Budget}
              </div>
              {EventURI.status == 'ended' ? (
                <>
                  <div className="text-chichi text-center">Auction Ended</div>
                </>
              ) : (
                <>
                  {EventURI.isOwner ? (
                    <>
                      <div className="text-trunks text-center">NFT donations are put up for bidding at the event</div>
                      <Button animation={isDistributing ? 'progress' : false} disabled={isDistributing} className="font-bold" onClick={distributeNFTs}>
                        Distribute NFTs to highest bidder
                      </Button>
                      <div className="flex flex-1 flex-col justify-end text-center text-trunks text-moon-12">
                        99.9% of the proceeds go to the charity. <br /> Just 0.1% goes to DAOnation.
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {isAuction() && tabIndex === 1 && (
          <div className="container mt-[-2rem] w-full flex flex-wrap gap-6">
            {nfts.map((item, i) => (
              <NFTCard className="w-2/4" item={item} key={i} onShowBidHistory={() => setShowBidHistoryModal(item)} eventStatus={EventURI.status} onShowPlaceHigherBid={() => setShowPlaceHigherBidModal(item)} />
            ))}
          </div>
        )}
      </div>

      <DonateNFTModal daoid={EventURI?.daoId} open={showDonateNftModal} onClose={closeDonateNFTModal} eventid={eventID} eventName={EventURI.Title} />
      <DonateCoinToEventModal open={showDonateCoinModal} onClose={closeDonateCoinModal} eventName={EventURI.Title} eventid={eventID} recieveWallet={EventURI.wallet} />
      <PlaceHigherBidModal open={!!showPlaceHigherBidModal} onClose={() => setShowPlaceHigherBidModal(null)} recieveWallet={EventURI.wallet} item={showPlaceHigherBidModal} />
      <BidHistoryModal open={!!showBidHistoryModal} onClose={() => setShowBidHistoryModal(null)} item={showBidHistoryModal} />
    </>
  );
}
