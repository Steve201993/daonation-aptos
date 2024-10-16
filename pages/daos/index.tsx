import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import DAOCard from '../../components/components/DaoCard';
import Loader from '../../components/components/Loader';
import EmptyState from '../../components/components/EmptyState';
import { Button } from '@heathmont/moon-core-tw';
import { ControlsPlus, GenericUsers } from '@heathmont/moon-icons-tw';
import CreateDaoModal from '../../features/CreateDaoModal';
import JoinCommunityModal from '../../features/JoinCommunityModal';
import { Dao } from '../../data-model/dao';

import { useAptosContext } from '../../contexts/AptosContext'; 

export default function DAOs() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDaoModal, setShowCreateDaoModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinedDaosList, setJoinedDaosList] = useState([]);
  const [communityToJoin, setCommunityToJoin] = useState({} as Dao);
  const {ReadContract,aptosClient,parseDao} = useAptosContext();

  useEffect(() => {
    fetchData();
  }, [aptosClient]);

  async function fetchData() {
    if (aptosClient) {
      setLoading(true);
      let allDaosIds = Number(await ReadContract("DaoIds",[]));
      let allJoinedDaos = await ReadContract("get_all_user_joined_dao_ids",[Number(window.userid)]) as number[];

      let allDaos = [];
      for (let i = 0; i < allDaosIds; i++) {

        const daoInfoUnparsed = await ReadContract("daoMap",[i]);
        const daoInfo = await parseDao(daoInfoUnparsed);
        allDaos.push(daoInfo);
      }
      const joinedDaosList = [];


      allJoinedDaos.forEach((joined_dao) => {
        let foundDao = allDaos.filter((e) => e?.daoId.toString() == joined_dao.toString());
        if ( foundDao.length > 0) {
          joinedDaosList.push(foundDao[0]);
        }
      });
      allDaos.forEach((dao) => {
        if (Number(dao.user_id) === Number(window.userid)) {
          joinedDaosList.push(dao);
        }
      });
      setLoading(false);
      setList(allDaos.reverse());
      setJoinedDaosList(joinedDaosList);
    }
  }

  function closeModal(event) {
    setShowCreateDaoModal(false);
  }

  function openCreateDaoModal() {
    setShowCreateDaoModal(true);
  }

  function closeJoinCommunityModal(event) {
    if (event) {
      setShowJoinModal(false);
      setCommunityToJoin(null);
    }
  }

  function openJoinModal(community) {
    setCommunityToJoin(community);
    setShowJoinModal(true);
  }

  function hasJoined(thisDAO) {
    return joinedDaosList.some((dao) => dao.daoId === thisDAO.daoId);
  }

  return (
    <>
      <Head>
        <title>Charities</title>
        <meta name="description" content="DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex items-center flex-col gap-8`}>
        <div className={`gap-8 flex w-full bg-gohan pt-10 pb-6 border-beerus border`}>
          <div className="container flex w-full justify-between">
            <h1 className="text-moon-32 font-bold">All charities</h1>
            <Button iconLeft={<ControlsPlus />} onClick={openCreateDaoModal} className="pe-2 sm:pe-4">
              <span className="hidden sm:inline-block">Create charity</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-8 container items-center !pb-10">
          <Loader element={list.length > 0 ? list.map((listItem, index) => <DAOCard hasJoined={hasJoined(listItem)} item={listItem} key={index} onJoinCommunity={() => openJoinModal(listItem)} />) : <EmptyState icon={<GenericUsers className="text-moon-48" />} label="There are no communities created yet" />} loading={loading} width={768} height={236} many={3} />{' '}
        </div>
      </div>

      <CreateDaoModal open={showCreateDaoModal} onClose={closeModal} />
      <JoinCommunityModal SubsPrice={communityToJoin?.SubsPrice} customUrl={communityToJoin?.customUrl} show={showJoinModal} onHide={closeJoinCommunityModal} address={communityToJoin?.wallet} recieveWallet={communityToJoin?.recievewallet} recievetype={communityToJoin?.recievetype} title={communityToJoin?.Title} daoId={communityToJoin?.daoId} />
    </>
  );
}
