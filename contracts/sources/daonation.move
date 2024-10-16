module daonation_addr::DaonationTest1  {

  use std::string::String;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_std::string_utils;
    use aptos_framework::aptos_account ;
    use std::vector;
    use std::signer;
    use std::vector::{empty, push_back};

  use std::string;

  // Errors
  const E_NOT_INITIALIZED: u64 = 1;



  struct UserStruct  has store, drop, copy{
      id: u64,
      full_name: String,
      email: String,
      password: String,
      img_ipfs: String,
      wallet_address: String
    }

  struct UserList has key {
    users: SmartTable<u64, UserStruct> ,
    user_ids: u64
  }


  struct DaoStruct  has store, drop, copy{
      id: u64,
      dao_uri: String,
      dao_wallet: String,
      finished: String
    }

  struct DaoList has key {
    daos: SmartTable<u64, DaoStruct> ,
    dao_ids: u64
  }


  struct JoinedStruct  has store, drop, copy{
    id: u64,
    daoid: u64,
    user_id: u64,
    joined_date:String
  }

  struct JoinedList has key {
    joins: SmartTable<u64, JoinedStruct> ,
    join_ids: u64
  }


  struct FeedStruct  has store, drop, copy{
    feed_id: u64,
    date: u64,
    feed_type: String,
    data: String
  }

  struct FeedList has key {
    feeds: SmartTable<u64, FeedStruct> ,
    feed_ids: u64
  }


  struct EventAuctionStruct  has store, drop, copy{
     id: u64,
     dao_id: u64,
     user_id: u64,
     event_uri: String,
     event_wallet: String,
     raised: String,
     status: String
  }

  struct EventAuctionList has key {
    events: SmartTable<u64, EventAuctionStruct> ,
    event_ids: u64
  }

  struct EventTokenStruct  has store, drop, copy{
    id: u64,

    event_id: u64,
    dao_id: u64,
    token_uri: String,
    token_wallet: String,
    token_owner: u64,
    highest_amount: u64,
    highest_bidder: String,
    highest_bidder_userid: u64,
    highest_bidder_wallet: String,
    highest_bid_date: String
  }

  struct EventTokenList has key {
    tokens: SmartTable<u64, EventTokenStruct> ,
    token_ids: u64
  }


  struct TokenBidStruct  has store, drop, copy{
   id: u64,

    nft_id: u64,
    event_id: u64,
    dao_id: u64,
    date: String,
    bidder: String,
    wallet_address: String,
    bidder_userid: u64,
    bid_amount: u64
  }

  struct TokenBidList has key {
    bids: SmartTable<u64, TokenBidStruct> ,
    bid_ids: u64
  }

  struct GoalStruct  has store, drop, copy{
    id: u64,

    dao_id: u64,
    goal_uri: String
  }

  struct GoalList has key {
    goals: SmartTable<u64, GoalStruct> ,
    goal_ids: u64
  }

  struct IdeasStruct  has store, drop, copy{
    id: u64,

    dao_id: u64,
    goal_id: u64,
    ideas_uri: String,
    donation: u64
  }

  struct IdeasList has key {
    ideas: SmartTable<u64, IdeasStruct> ,
    idea_ids: u64
  }

  struct EventDonationStruct  has store, drop, copy{
   	 id: u64,
      event_id: u64,
     userid: u64,
     donation: u64
  }

  struct EventDonationList has key {
    donations: SmartTable<u64, EventDonationStruct> ,
    donation_ids: u64
  }


  struct DonationStruct  has store, drop, copy{
   	 id: u64,
     ideas_id: u64,
     userid: u64,
     donation: u64
  }

  struct DonationList has key {
    donations: SmartTable<u64, DonationStruct> ,
    donation_ids: u64
  }
  struct DonatedList has key {
    donated: SmartTable<u64, u64> ,
  }


  struct VoteStruct  has store, drop, copy{
    id: u64,
     goal_id: u64,
     ideas_id: u64,
     user_id: u64
  }

  struct VoteList has key {
    votes: SmartTable<u64, VoteStruct> ,
    vote_ids: u64
  }

  struct CommentStruct  has store, drop, copy{
     message_id: u64,
     ideas_id: u64,
     goals_id: u64,
     dao_id: u64,
     message: String,
     sender: u64
  }

  struct CommentList has key {
    comments: SmartTable<u64, CommentStruct> ,
    comment_ids: u64
  }
  public entry fun init(account: &signer){
    let user_list = UserList {
      users: smart_table::new(),
      user_ids: 0
    };
    move_to(account, user_list);
  let dao_list = DaoList {
      daos: smart_table::new(),
      dao_ids: 0
    };
    move_to(account, dao_list);
 
 let join_list = JoinedList {
      joins: smart_table::new(),
      join_ids: 0
    };
    move_to(account, join_list);
 
 let feed_list = FeedList {
      feeds: smart_table::new(),
      feed_ids: 0
    };
    move_to(account, feed_list);
 
 let event_auction_list = EventAuctionList {
      events: smart_table::new(),
      event_ids: 0
    };
    move_to(account, event_auction_list);
 
    let event_token_list = EventTokenList {
      tokens: smart_table::new(),
      token_ids: 0
    };
    move_to(account, event_token_list);
 
    let goal_list = GoalList {
      goals: smart_table::new(),
      goal_ids: 0
    };
    move_to(account, goal_list);
 
    let idea_list = IdeasList {
      ideas: smart_table::new(),
      idea_ids: 0
    };
    move_to(account, idea_list);

    let donation_list = DonationList {
      donations: smart_table::new(),
      donation_ids: 0
    };
    move_to(account, donation_list);
    let vote_list = VoteList {
      votes: smart_table::new(),
      vote_ids: 0
    };
    move_to(account, vote_list); 
     let donated_list = DonatedList {
      donated: smart_table::new(),
    };
    move_to(account, donated_list);
     let comment_list = CommentList {
      comments: smart_table::new(),
      comment_ids: 0
    };
    move_to(account, comment_list);
  }

  public entry fun registerUser(   	full_name: String, email: String, password: String, img_ipfs: String, wallet_address:String) acquires UserList {

    // assert signer has created a list
    assert!(exists<UserList>(@daonation_addr), E_NOT_INITIALIZED);
    // gets the UserList resource
    let user_list = borrow_global_mut<UserList>(@daonation_addr);

    // creates a new USER
    let new_uri = UserStruct {
              id: user_list.user_ids,
              full_name: full_name,
              email: email,
              password: password,
              img_ipfs: img_ipfs,
              wallet_address: wallet_address
          };
    

    // upsert the new User into the users table
    smart_table::upsert(&mut user_list.users, user_list.user_ids, new_uri);
    
       // sets the User counter to be the incremented counter
    user_list.user_ids = user_list.user_ids + 1;


  }


 
  
    #[view]
      public fun CheckEmail(email: String): String acquires  UserList {
          let user_list = borrow_global_mut<UserList>(@daonation_addr);
          let i = 0;
          let output = string::utf8(b"False") ;
          while (i < user_list.user_ids) { 
                let v =  *smart_table::borrow(&mut user_list.users, i);
                if (v.email == email) {
                    output = string_utils::format1(&b"{}", i) ;
                };
                i = i +1;
            };
          output
        }



    #[view]
      public fun Login(email: String, password: String): String acquires  UserList {
          let user_list = borrow_global_mut<UserList>(@daonation_addr);
          let i = 0;
          let output = string::utf8(b"False") ;
          while (i < user_list.user_ids) { 
                let v =  *smart_table::borrow(&mut user_list.users, i);
                if (v.email == email && v.password == password) {
                    output = string_utils::format1(&b"{}", i) ;
                };
                
                i = i +1;
            };
          output
        }




  

    public entry fun createDao(dao_wallet: String, dao_uri: String) acquires DaoList {

      // assert signer has created a list
      assert!(exists<DaoList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the DaoList resource
      let dao_list = borrow_global_mut<DaoList>(@daonation_addr);

      // creates a new Dao
      let new_uri = DaoStruct {
                id: dao_list.dao_ids,
                dao_uri: dao_uri,
                dao_wallet: dao_wallet,
                finished:  string::utf8(b"False")
            };
      

      // upsert the new Dao into the Daos table
      smart_table::upsert(&mut dao_list.daos, dao_list.dao_ids, new_uri);
      // sets the Dao counter to be the incremented counter
      dao_list.dao_ids = dao_list.dao_ids + 1;
    }
    public entry fun joinCommunity(dao_id: u64,user_id: u64,joined_date:String,feed: String,date:u64) acquires JoinedList,FeedList {

      // assert signer has created a list
      assert!(exists<JoinedList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the JoinedList resource
      let join_list = borrow_global_mut<JoinedList>(@daonation_addr);

      let new_uri = JoinedStruct {
          id: join_list.join_ids,
          daoid: dao_id,
          user_id: user_id,
          joined_date:joined_date
      };
      

      smart_table::upsert(&mut join_list.joins, join_list.join_ids, new_uri);
      join_list.join_ids = join_list.join_ids + 1;



    assert!(exists<FeedList>(@daonation_addr), E_NOT_INITIALIZED);
      let feed_list = borrow_global_mut<FeedList>(@daonation_addr);

      let new_feed = FeedStruct {
          feed_id: feed_list.feed_ids,
         date: date,
          feed_type: string::utf8(b"join"),
          data: feed
      };
      
      smart_table::upsert(&mut feed_list.feeds, feed_list.feed_ids, new_feed);
      feed_list.feed_ids = feed_list.feed_ids + 1;

    }
    


    public entry fun createEvent(	event_uri: String,dao_id: u64,user_id: u64,feed: String, date:u64) acquires EventAuctionList,FeedList {

      // assert signer has created a list
      assert!(exists<EventAuctionList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the EventAuctionList resource
      let event_auction_list = borrow_global_mut<EventAuctionList>(@daonation_addr);

      let new_uri = EventAuctionStruct {
        id: event_auction_list.event_ids,
				dao_id:dao_id,
				user_id:user_id,
				event_uri:event_uri,
				event_wallet:event_uri,
				raised: string::utf8(b"0"),
				status:string::utf8(b"started"),
      };

      smart_table::upsert(&mut event_auction_list.events, event_auction_list.event_ids, new_uri);
      event_auction_list.event_ids = event_auction_list.event_ids + 1;



     assert!(exists<FeedList>(@daonation_addr), E_NOT_INITIALIZED);
      let feed_list = borrow_global_mut<FeedList>(@daonation_addr);

      let new_feed = FeedStruct {
          feed_id: feed_list.feed_ids,
          date: date,
          feed_type: string::utf8(b"event"),
          data: feed
      };
      
    }
    

    public entry fun claimToken(	dao_id: u64, event_id: u64, token_uri: String, token_price: u64, token_userid: u64, token_wallet: String, token_person: String, highest_bid_date: String,) acquires EventTokenList {

      // assert signer has created a list
      assert!(exists<EventTokenList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the EventTokenList resource
      let token_list = borrow_global_mut<EventTokenList>(@daonation_addr);

      let new_uri = EventTokenStruct {
              id: token_list.token_ids,
            
              dao_id: dao_id,
              event_id: event_id,
              token_uri: token_uri,
              token_wallet: token_wallet,
              highest_amount: token_price,
              token_owner: token_userid,
              highest_bidder: token_person,
              highest_bidder_userid: token_userid,
              highest_bidder_wallet: token_wallet,
              highest_bid_date: highest_bid_date,
            };
      
      smart_table::upsert(&mut token_list.tokens, token_list.token_ids, new_uri);
      token_list.token_ids = token_list.token_ids + 1;
    }


 public entry fun addEventDonation(	event_id: u64,doantion: u64,userid: u64) acquires EventDonationList,DonatedList {

      // assert signer has created a list
      assert!(exists<EventDonationList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the EventDonationList resource
      let donation_list = borrow_global_mut<EventDonationList>(@daonation_addr);

      let new_uri = EventDonationStruct {
      	id: donation_list.donation_ids,
				event_id: event_id,
				userid: userid,
				donation: doantion,

      };
      

      smart_table::upsert(&mut donation_list.donations, donation_list.donation_ids, new_uri);
      donation_list.donation_ids = donation_list.donation_ids + 1;



     assert!(exists<DonatedList>(@daonation_addr), E_NOT_INITIALIZED);
      let donated_list = borrow_global_mut<DonatedList>(@daonation_addr);

      let old_donated = *smart_table::borrow_with_default(&mut donated_list.donated,userid,&0);
      
      smart_table::upsert(&mut donated_list.donated, userid, old_donated + doantion);
     
    }




    public entry fun distributeNfts(		event_id:u64) acquires EventAuctionList,EventTokenList {

      // assert signer has created a list
      assert!(exists<EventAuctionList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the EventAuctionList resource
      let event_list = borrow_global_mut<EventAuctionList>(@daonation_addr);

      let old_event = *smart_table::borrow_mut(&mut event_list.events, event_id);

      old_event.status = string::utf8(b"ended");

      smart_table::upsert(&mut event_list.events,event_id, old_event);



        let token_list = borrow_global_mut<EventTokenList>(@daonation_addr);
          let i = 0;
          while (i < token_list.token_ids) { 
                let v =  *smart_table::borrow_mut(&mut token_list.tokens, i);
                if (v.event_id == event_id) {
                   v.token_owner = v.highest_bidder_userid;
                    smart_table::upsert(&mut  token_list.tokens, i, v);
                };
                
                i = i +1;
            };



    }



    public entry fun createGoal(		goal_uri: String, dao_id: u64, user_id: String, feed: String, date:u64) acquires GoalList,FeedList {

      // assert signer has created a list
      assert!(exists<GoalList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the GoalList resource
      let goal_list = borrow_global_mut<GoalList>(@daonation_addr);

      let new_uri = GoalStruct {
        id: goal_list.goal_ids,
				dao_id: dao_id,
				goal_uri: goal_uri

      };
      

      smart_table::upsert(&mut goal_list.goals, goal_list.goal_ids, new_uri);
      goal_list.goal_ids = goal_list.goal_ids + 1;



     assert!(exists<FeedList>(@daonation_addr), E_NOT_INITIALIZED);
      let feed_list = borrow_global_mut<FeedList>(@daonation_addr);

      let new_feed = FeedStruct {
          feed_id: feed_list.feed_ids,
          date: date,
          feed_type: string::utf8(b"goal"),
          data: feed
      };
      
      smart_table::upsert(&mut feed_list.feeds, feed_list.feed_ids, new_feed);
      feed_list.feed_ids = feed_list.feed_ids + 1;

    }


    public entry fun createIdeas(		ideas_uri: String, goal_id: u64, dao_id: u64, user_id: u64, feed: String, date:u64) acquires IdeasList,FeedList {

      // assert signer has created a list
      assert!(exists<IdeasList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the IdeasList resource
      let idea_list = borrow_global_mut<IdeasList>(@daonation_addr);

      let new_uri = IdeasStruct {
      	id: idea_list.idea_ids,
				dao_id: dao_id,
				goal_id: goal_id,
				ideas_uri: ideas_uri,
				donation: 0,

      };
      

      smart_table::upsert(&mut idea_list.ideas, idea_list.idea_ids, new_uri);
      idea_list.idea_ids = idea_list.idea_ids + 1;



     assert!(exists<FeedList>(@daonation_addr), E_NOT_INITIALIZED);
      let feed_list = borrow_global_mut<FeedList>(@daonation_addr);

      let new_feed = FeedStruct {
          feed_id: feed_list.feed_ids,
          date: date,
          feed_type: string::utf8(b"idea"),
          data: feed
      };
      
      smart_table::upsert(&mut feed_list.feeds, feed_list.feed_ids, new_feed);
      feed_list.feed_ids = feed_list.feed_ids + 1;

    }



    public entry fun addDonation(	ideas_id: u64,donation: u64,userid: u64, feed:String, date:u64) acquires DonationList,IdeasList,DonatedList,FeedList {

      // assert signer has created a list
      assert!(exists<DonationList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the DonationList resource
      let donation_list = borrow_global_mut<DonationList>(@daonation_addr);

      let new_uri = DonationStruct {
      	id: donation_list.donation_ids,
				ideas_id: ideas_id,
				userid: userid,
				donation: donation,

      };
      

      smart_table::upsert(&mut donation_list.donations, donation_list.donation_ids, new_uri);
      donation_list.donation_ids = donation_list.donation_ids + 1;



     assert!(exists<DonatedList>(@daonation_addr), E_NOT_INITIALIZED);
      let donated_list = borrow_global_mut<DonatedList>(@daonation_addr);

      let old_donated = *smart_table::borrow_with_default(&mut donated_list.donated,userid,&0);
      
      smart_table::upsert(&mut donated_list.donated, userid, old_donated + donation);
     
      assert!(exists<IdeasList>(@daonation_addr), E_NOT_INITIALIZED);
      let ideas_list = borrow_global_mut<IdeasList>(@daonation_addr);

      let old_idea = *smart_table::borrow_mut(&mut ideas_list.ideas,ideas_id);
      old_idea.donation = old_idea.donation + donation;

      smart_table::upsert(&mut ideas_list.ideas, ideas_id, old_idea);
     

     assert!(exists<FeedList>(@daonation_addr), E_NOT_INITIALIZED);
      let feed_list = borrow_global_mut<FeedList>(@daonation_addr);

      let new_feed = FeedStruct {
          feed_id: feed_list.feed_ids,
          date: date,
          feed_type: string::utf8(b"donation"),
          data: feed
      };
      smart_table::upsert(&mut feed_list.feeds, feed_list.feed_ids, new_feed);
      feed_list.feed_ids = feed_list.feed_ids + 1;



    }

    
    public entry fun createVote(goal_id: u64,ideas_id: u64,user_id: u64,feed:String, date:u64, shoudAdd:u64) acquires VoteList,FeedList {

      // assert signer has created a list
      assert!(exists<VoteList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the VoteList resource
      let vote_list = borrow_global_mut<VoteList>(@daonation_addr);

      let new_uri = VoteStruct {
      	id: vote_list.vote_ids,
			  goal_id: goal_id,
				ideas_id:ideas_id,
				user_id: user_id

      };
      

      smart_table::upsert(&mut vote_list.votes, vote_list.vote_ids, new_uri);
      vote_list.vote_ids = vote_list.vote_ids + 1;


    if (shoudAdd == 0){

     assert!(exists<FeedList>(@daonation_addr), E_NOT_INITIALIZED);
      let feed_list = borrow_global_mut<FeedList>(@daonation_addr);

      let new_feed = FeedStruct {
          feed_id: feed_list.feed_ids,
          date: date,
          feed_type: string::utf8(b"vote"),
          data: feed
      };
      
      smart_table::upsert(&mut feed_list.feeds, feed_list.feed_ids, new_feed);
      feed_list.feed_ids = feed_list.feed_ids + 1;

    }



    }


    public entry fun sendMsg(ideas_id: u64,
			goals_id: u64,
			dao_id: u64,
			message: String,
			sender: u64,) acquires CommentList {

      // assert signer has created a list
      assert!(exists<CommentList>(@daonation_addr), E_NOT_INITIALIZED);
      // gets the CommentList resource
      let comment_list = borrow_global_mut<CommentList>(@daonation_addr);

      let new_uri = CommentStruct {
      	message_id: comment_list.comment_ids,
        ideas_id: ideas_id,
        goals_id: goals_id,
        dao_id: dao_id,
        message: message,
        sender: sender

      };
      

      smart_table::upsert(&mut comment_list.comments, comment_list.comment_ids, new_uri);
      comment_list.comment_ids = comment_list.comment_ids + 1;

    }


  
   #[view]
    public fun get_all_user_joined_dao_ids(user_id:u64): vector<u64> acquires  JoinedList{
      let new_vec:vector<u64> = empty();
      let joined_list = borrow_global_mut<JoinedList>(@daonation_addr);
      let i = 0;
      while (i < joined_list.join_ids) { 
            let v =  *smart_table::borrow(&mut joined_list.joins, i);
            if (v.user_id == user_id) {
                vector::push_back(&mut new_vec, v.id) ;
            };
            
            i = i +1;
      };
      new_vec

    }





   #[view]
    public fun get_all_goals_by_dao_id(dao_id:u64): vector<u64> acquires  GoalList{
        let new_vec:vector<u64> = empty();

         let goal_list = borrow_global_mut<GoalList>(@daonation_addr);
          let i = 0;
          while (i < goal_list.goal_ids) { 
                let v =  *smart_table::borrow(&mut goal_list.goals, i);
                if (v.dao_id == dao_id) {
                    vector::push_back(&mut new_vec, i) ;
                };
                
                i = i +1;
            };

        new_vec
    }

    

   #[view]
    public fun get_all_ideas_by_goal_id(goal_id:u64): vector<u64> acquires  IdeasList{
        let new_vec:vector<u64> = empty();

         let ideas_list = borrow_global_mut<IdeasList>(@daonation_addr);
          let i = 0;
          while (i < ideas_list.idea_ids) { 
                let v =  *smart_table::borrow(&mut ideas_list.ideas, i);
                if (v.goal_id == goal_id) {
                    vector::push_back(&mut new_vec, i) ;
                };
                
                i = i +1;
            };

        new_vec
    }



   

   #[view]
    public fun get_reached_by_goal_id(goal_id:u64): u64 acquires  IdeasList{
        let output:u64 = 0;

         let ideas_list = borrow_global_mut<IdeasList>(@daonation_addr);
          let i = 0;
          while (i < ideas_list.idea_ids) { 
                let v =  *smart_table::borrow(&mut ideas_list.ideas, i);
                if (v.goal_id == goal_id) {
                    output = output + v.donation;
                };
                
                i = i +1;
            };

        output
    }


   #[view]
    public fun get_votes_user_by_idea_id(ideas_id:u64): vector<u64> acquires  VoteList{
            let new_vec:vector<u64> = empty();

         let votes_list = borrow_global_mut<VoteList>(@daonation_addr);
          let i = 0;
          while (i < votes_list.vote_ids) { 
                let v =  *smart_table::borrow(&mut votes_list.votes, i);
                if (v.ideas_id == ideas_id) {
                      vector::push_back(&mut new_vec, v.user_id) ;
                };
                
                i = i +1;
            };

        new_vec
    }




 
    #[view]
      public fun UserIds(): u64 acquires  UserList {
        let userList = borrow_global_mut<UserList>(@daonation_addr);
         userList.user_ids
      }

      
    #[view]
      public fun DaoIds(): u64 acquires  DaoList {
        let daoList = borrow_global_mut<DaoList>(@daonation_addr);
         daoList.dao_ids
      }

    #[view]
      public fun JoinedIds(): u64 acquires  JoinedList {
        let joinList = borrow_global_mut<JoinedList>(@daonation_addr);
         joinList.join_ids
      }
      
    #[view]
      public fun FeedIds(): u64 acquires  FeedList {
        let feedList = borrow_global_mut<FeedList>(@daonation_addr);
         feedList.feed_ids
      }
      
    #[view]
      public fun EventIds(): u64 acquires  EventAuctionList {
        let eventList = borrow_global_mut<EventAuctionList>(@daonation_addr);
         eventList.event_ids
      }

    #[view]
      public fun TokenIds(): u64 acquires  EventTokenList {
        let tokenList = borrow_global_mut<EventTokenList>(@daonation_addr);
         tokenList.token_ids
      }

    #[view]
      public fun GoalIds(): u64 acquires  GoalList {
        let goalList = borrow_global_mut<GoalList>(@daonation_addr);
         goalList.goal_ids
      }


    #[view]
      public fun IdeaIds(): u64 acquires  IdeasList {
        let ideaList = borrow_global_mut<IdeasList>(@daonation_addr);
         ideaList.idea_ids
      }

    #[view]
      public fun DonationIds(): u64 acquires  DonationList {
        let donationList = borrow_global_mut<DonationList>(@daonation_addr);
         donationList.donation_ids
      }

        
    #[view]
      public fun CommentListIds(): u64 acquires  CommentList {
        let commentList = borrow_global_mut<CommentList>(@daonation_addr);
         commentList.comment_ids
      }


        
    
    #[view]
      public fun userMap(id: u64): UserStruct acquires  UserList {
        let user_list = borrow_global_mut<UserList>(@daonation_addr);
        *smart_table::borrow(&mut user_list.users, id)
      }

      
    #[view]
      public fun daoMap(id: u64): DaoStruct acquires  DaoList {
        let dao_list = borrow_global_mut<DaoList>(@daonation_addr);
        *smart_table::borrow(&mut dao_list.daos, id)
      }


    
    #[view]
      public fun joinedMap(id: u64): JoinedStruct acquires  JoinedList {
        let join_list = borrow_global_mut<JoinedList>(@daonation_addr);
        *smart_table::borrow(&mut join_list.joins, id)
      }

    
    
    #[view]
      public fun feedMap(id: u64): FeedStruct acquires  FeedList {
        let feed_list = borrow_global_mut<FeedList>(@daonation_addr);
        *smart_table::borrow(&mut feed_list.feeds, id)
      }

    
    
    #[view]
      public fun eventMap(id: u64): EventAuctionStruct acquires  EventAuctionList {
        let event_list = borrow_global_mut<EventAuctionList>(@daonation_addr);
        *smart_table::borrow(&mut event_list.events, id)
      }

    
    #[view]
      public fun tokenMap(id: u64): EventTokenStruct acquires  EventTokenList {
        let token_list = borrow_global_mut<EventTokenList>(@daonation_addr);
        *smart_table::borrow(&mut token_list.tokens, id)
      }

    #[view]
      public fun bidMap(id: u64): TokenBidStruct acquires  TokenBidList {
        let bid_list = borrow_global_mut<TokenBidList>(@daonation_addr);
        *smart_table::borrow(&mut bid_list.bids, id)
      }


    #[view]
      public fun goalMap(id: u64): GoalStruct acquires  GoalList {
        let goal_list = borrow_global_mut<GoalList>(@daonation_addr);
        *smart_table::borrow(&mut goal_list.goals, id)
      }


    #[view]
      public fun ideasMap(id: u64): IdeasStruct acquires  IdeasList {
        let idea_list = borrow_global_mut<IdeasList>(@daonation_addr);
        *smart_table::borrow(&mut idea_list.ideas, id)
      }

    #[view]
      public fun eventDonationMap(id: u64): EventDonationStruct acquires  EventDonationList {
        let donation_list = borrow_global_mut<EventDonationList>(@daonation_addr);
        *smart_table::borrow(&mut donation_list.donations, id)
      }

    #[view]
      public fun donationMap(id: u64): DonationStruct acquires  DonationList {
        let donation_list = borrow_global_mut<DonationList>(@daonation_addr);
        *smart_table::borrow(&mut donation_list.donations, id)
      }


    #[view]
      public fun donatedMap(id: u64): u64 acquires  DonatedList {
        let donated_list = borrow_global_mut<DonatedList>(@daonation_addr);
        *smart_table::borrow(&mut donated_list.donated, id)
      }

    #[view]
      public fun voteMap(id: u64): VoteStruct acquires  VoteList {
        let vote_list = borrow_global_mut<VoteList>(@daonation_addr);
        *smart_table::borrow(&mut vote_list.votes, id)
      }


    #[view]
      public fun commentMap(id: u64): CommentStruct acquires  CommentList {
        let comment_list = borrow_global_mut<CommentList>(@daonation_addr);
        *smart_table::borrow(&mut comment_list.comments, id)
      }
}
