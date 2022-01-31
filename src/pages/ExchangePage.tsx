import Select from '../components/Select';
import ActiveGifts from '../components/ActiveGifts';
import FrozenGifts from '../components/FrozenGifts';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

const ExchangePage = (): JSX.Element => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const playerFormData = location.state;
  const numPlayers = playerFormData.length;
  const [players, setPlayers] = useState(playerFormData);
  const [gifts, setGifts] = useState<Array<{ name: string, currentOwner: string }>>([]);
  const [giftsForSelect, setGiftsForSelect] = useState<Array<string>>([]);
  // const [hasGifts, setHasGifts] = useState(false);
  const [newGiftInput, setNewGiftInput] = useState('');
  const [unopenedGiftsRemaining, setUnopenedGiftsRemaining] = useState(numPlayers);
  // const [disableAddButton, setDisableAddButton] = useState(true);
  const [currentPlayerSelectValue, setCurrentPlayerSelectValue] = useState('');
  const [currentGiftSelectValue, setCurrentGiftSelectValue] = useState('');
  const [currentOwner, setCurrentOwner] = useState([]);
  const [currentOwners, setCurrentOwners] = useState([]);
  const [currentForActiveGifts, setCurrentForActiveGifts] = useState([{name: '', currentOwner: ''}]);

  const handleInputUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    let typedTarget = event.target as HTMLInputElement;
    setNewGiftInput(typedTarget.value);
  }

  const handleAddGift = () => {
    // TODO: think through this logic a bit
    // console.log('disableAddButton coming into handleAdd: ', disableAddButton);
    // let checkDisableAdd = disableAdd();
    // console.log('checkDisableAdd: ', checkDisableAdd);
    // if(checkDisableAdd === true) {
    //   return
    // } else {
    //   const newGiftsArray = [...gifts, {name: newGiftInput}];
    //   setGifts(newGiftsArray);
    //   setUnopenedGiftsRemaining(unopenedGiftsRemaining - 1);
    //   // setHasGifts(true);
    // }

    const giftsForSelectArray = [...giftsForSelect, newGiftInput];
    setGiftsForSelect(giftsForSelectArray);

    const newGiftsArray = [...gifts, {name: newGiftInput, currentOwner: 'No Owner'}];
    setGifts(newGiftsArray);

    setCurrentForActiveGifts(newGiftsArray);
    setUnopenedGiftsRemaining(unopenedGiftsRemaining - 1);
    // setHasGifts(true);
  }



  // TODO: ditto from handleAdd
  // const disableAdd = () => {
  //   let emptyInput;
  //   emptyInput = newGiftInput === '' ? true : false;
  //   console.log('emptyInput: ', emptyInput);
    
  //   let noGiftsLeft;
  //   noGiftsLeft = unopenedGiftsRemaining === 0 ? true : false;
  //   console.log('noGiftsLeft: ', noGiftsLeft);

  //   // if(emptyInput || noGiftsLeft) {
  //   //   setDisableAddButton(true);
  //   // } else {
  //   //   setDisableAddButton(false);
  //   // }

  //   if(emptyInput) {
  //     setDisableAddButton(true);
  //   } else {
  //     setDisableAddButton(false);
  //   }
    
  //   if(noGiftsLeft) {
  //     setDisableAddButton(true);
  //   } else {
  //     setDisableAddButton(false);
  //   }

  //   // emptyInput ? setDisableAddButton(true) : setDisableAddButton(false);
  //   // noGiftsLeft ? setDisableAddButton(true) : setDisableAddButton(false);
    
  //   console.log('disableAddButton final: ', disableAddButton);
  //   return disableAddButton;
  // }

  const handleUpdateGift = (
    // what needs to happen when a gift is updated:






    // currentPlayersInActiveGifts: Array<{name: string, currentGift?: string}>, 
    // currentGiftsInActiveGifts: Array<{name: string, currentOwner?: string}>,
    currentGiftsInActiveGifts: Array<{name: string, currentOwner?: string}>,
    playerToUpdateInActiveGifts: string,
    giftToUpdateInActiveGifts: string,
  ) => {
    console.log('hitting here');
    console.log('currentGiftsInActiveGifts from Exchange pg (data from child): ', currentGiftsInActiveGifts);
    console.log('playerToUpdateInActiveGifts from Exchange pg (data from child): ', playerToUpdateInActiveGifts);
    console.log('giftToUpdateInActiveGifts from Exchange pg (data from child): ', giftToUpdateInActiveGifts);
    // let playerToUpdate = players.filter((player: {name: string}) => player.name === currentPlayerSelectValue);
    // since filter returns an array, have to access the player object at playerToUpdate[0]
    // playerToUpdate[0].currentGift = currentGiftSelectValue;

  }

  const handlePlayerChange = (currentPlayerSelectValue: string) => {
    setCurrentPlayerSelectValue(currentPlayerSelectValue);
  }

  const handleGiftChange = (currentGiftSelectValue: string) => {
    setCurrentGiftSelectValue(currentGiftSelectValue);
  }

  return (
    <div className="w-full mx-auto max-h-screen overflow-auto">
      <div>
        <h1 className="text-2xl font-bold">Exchange</h1>
        {/* TODO: eventually want to render the name of the Host here */}
        <p>Host, this is your time to shine!</p>
        <p className="pb-6">Log each gift as it's opened, as well as any time a gift is stolen.</p>
      </div>

      {/* Main wrapper */}
      <div className="w-full h-full p-6 overflow-auto border-2 border-gray">
        {/* Actions wrapper */}
        <div className="border-2 border-dashed border-green-400 px-6 pt-1 pb-6 md:pt-2 md:pb-6 md:px-4">
          <h1 className="text-xl font-bold mb-1">Actions</h1>
          {/* Actions sub component wrapper */}
          <div className="flex flex-col md:flex-row">
            {/* Actions sub component */}
            <div className="border-2 border-gray p-2 md:w-1/2 md:mx-2">
              <div className="flex flex-col">
                <h1 className="font-bold text-sm md:text-base">Log New Gift</h1>
                <div className="flex flex-col mx-auto xl:flex-row xl:justify-between">
                  <div className="mx-auto md:mx-2">
                    <label 
                      htmlFor='new gift name'
                      className="flex justify-center text-sm md:text-base"
                    >
                      Gift Name
                    </label>
                    <input 
                      type="text" 
                      name="new gift name" 
                      value={newGiftInput}
                      onChange={handleInputUpdate}
                      className="border-2 border-black px-1 my-2 w-36 md:w-44"/>
                  </div>
                  <div className="flex flex-col justify-end mx-2">
                    <button 
                      className="border-2 border-black px-2 my-2 text-sm rounded hover:bg-green-400 md:text-base"
                      onClick={handleAddGift}
                      disabled={(newGiftInput === '' ? true : false)}
                      // disabled={disableAddButton}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Actions sub component */}
            <div className="border-2 border-gray p-2 mt-2 md:mt-0 md:w-1/2 md:mx-2">
              <div className="flex flex-col">
                <h1 className="font-bold text-sm md:text-base">Update Gift Owner</h1>
                <div className="flex flex-col mx-auto xl:flex-row xl:justify-between">
                  <div className="mx-auto md:mx-2">
                    <Select objectArray={players} label='Player' value={currentPlayerSelectValue} onValueChange={handlePlayerChange}/>
                  </div>
                  <div className="mx-auto md:mx-2">
                    {/* will eventually be active gifts instead of SelectValues */}
                    <Select stringArray={giftsForSelect} label='Gift' value={currentGiftSelectValue} onValueChange={handleGiftChange}/>
                    {/* TODO: think through how to prevent gift select from being clicked if no gifts have been added yet */}
                    {/* <Select giftArray={gifts} label='Gift' hasGifts={hasGifts}/> */}
                  </div>
                  <div className="flex flex-col justify-end mx-2">
                    <button 
                      className="border-2 border-black px-2 my-2 text-sm rounded hover:bg-green-400 md:text-base"
                      onClick={() => handleUpdateGift}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Actions sub component */}
            <div className="flex justify-center mt-6 md:mx-2 md:items-center md:mt-0">
              <button className="border-2 border-black px-2 h-1/2 text-sm rounded hover:bg-green-400 md:text-base md:h-1/3 xl:h-1/2">Advance to Next Opener</button>
            </div>
          </div>
        </div>
      
        {/* Info wrapper */}
        <div className="border-2 border-green-400 border-dashed mt-6 px-6 pt-1 pb-6 md:pt-2 md:pb-6 md:px-4">
          <h1 className="text-xl font-bold mb-1">Info</h1>
          {/* Info sub component wrapper */}
          <div className="border-2 border-gray p-2 mx-auto md:w-1/2">
            <h1 className="font-bold text-sm md:text-base">Unopened Gifts Remaining</h1>
            <p className="text-sm md:text-base">{unopenedGiftsRemaining}</p>
          </div>

          {/* Info sub component wrapper */}
          <div className="flex flex-col md:flex-row md:mt-6">
            <div className="border-2 border-gray p-2 mt-2 md:mt-0 md:w-1/2 md:mx-2">
              <h1 className="font-bold text-sm md:text-base md:mb-2">Current Opener</h1>
              <p className="text-sm md:text-base">Someone's Name</p>
            </div>
            <div className="border-2 border-gray p-2 mt-2 md:mt-0 md:w-1/2 md:mt-0 md:mx-2">
              <h1 className="font-bold text-sm md:text-base">Next Opener</h1>
              <p className="text-sm md:text-base">Someone Else's Name</p>
            </div>
          </div>
        
          {/* Info sub component wrapper */}
          <div className="flex flex-col md:flex-row md:mt-6">
            <div className="border-2 border-gray p-2 mt-2 md:mt-0 md:w-1/2 md:mx-2">
              <h1 className="font-bold text-sm md:text-base">Active Gifts</h1>
              {/* TODO: try unabstracting this first? */}
              <ActiveGifts allGifts={giftsForSelect} currentGifts={gifts} players={players} giftToUpdate={currentGiftSelectValue} playerToUpdate={currentPlayerSelectValue} handleUpdateGift={handleUpdateGift}/>
              {/* <ActiveGifts gifts={gifts} players={players} handleUpdateGift={() => handleUpdateGift} giftToUpdate={currentGiftSelectValue} playerToUpdate={currentPlayerSelectValue}/> */}
              {/* <ActiveGifts gifts={gifts} players={players} giftToUpdate={currentGiftSelectValue} playerToUpdate={currentPlayerSelectValue}/> */}
            </div>
            <div className="border-2 border-gray p-2 mt-2 md:mt-0 md:w-1/2 md:mt-0 md:mx-2">
              <h1 className="font-bold text-sm md:text-base">Frozen Gifts</h1>
              <FrozenGifts/>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-6">
          <button
            className={"border-2 border-black px-2 mx-2 rounded hover:bg-green-400 text-sm md:text-base"}
            onClick={() => navigate('/results')}
            // TODO: think through if this is really needed/wanted
            // disabled={unopenedGiftsRemaining === 0 ? false : true}
          >
            Complete Exchange
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExchangePage;
