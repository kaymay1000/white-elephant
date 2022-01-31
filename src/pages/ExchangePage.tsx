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
  const [newGiftInput, setNewGiftInput] = useState('');
  const [unopenedGiftsRemaining, setUnopenedGiftsRemaining] = useState(numPlayers);
  const [currentPlayerSelectValue, setCurrentPlayerSelectValue] = useState('');
  const [currentGiftSelectValue, setCurrentGiftSelectValue] = useState('');

  // Add New Gift functionality
  const handleNewGiftInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    let typedTarget = event.target as HTMLInputElement;
    setNewGiftInput(typedTarget.value);
  }

  const handleAddGift = () => {
    // add new gift blob to existing gifts array
    const newGiftsArray = [...gifts, {name: newGiftInput, currentOwner: 'No Owner'}];
    // set new gifts array into state
    setGifts(newGiftsArray);
    // decrement unopened gifts remaining
    setUnopenedGiftsRemaining(unopenedGiftsRemaining - 1);
  }

  // Update Gift functionality
  const handlePlayerChange = (currentPlayerSelectValue: string) => {
    setCurrentPlayerSelectValue(currentPlayerSelectValue);
  }

  const handleGiftChange = (currentGiftSelectValue: string) => {
    setCurrentGiftSelectValue(currentGiftSelectValue);
  }

  const handleUpdateGift = (
    currentGiftsInActiveGifts: Array<{name: string, currentOwner?: string}>,
  ) => {
    console.log('current gifts data from child): ', currentGiftsInActiveGifts);
    // look for currently selected gift in current gifts array from Active Gifts
    let giftToUpdate = currentGiftsInActiveGifts.filter((gift: {name: string}) => gift.name === currentGiftSelectValue)[0];
    console.log('gift to update in exchange page: ', giftToUpdate);
    // if the gift exists, update its currentOwner to the currently selected player
    if (giftToUpdate) {
      giftToUpdate.currentOwner = currentPlayerSelectValue;
    }
    console.log('gift to update in exchange page after update owner: ', giftToUpdate)
  }

  return (
    <div className="w-full mx-auto max-h-screen overflow-auto">
      <div>
        <h1 className="text-2xl font-bold">Exchange</h1>
        {/* TODO: eventually want to render the name of the Host here */}
        <p>Host, this is your time to shine!</p>
        <p className="pb-6">Log each gift as it's opened, as well as any time a gift is stolen.</p>
      </div>
      <div className="w-full h-full p-6 overflow-auto border-2 border-gray">
        <div className="border-2 border-dashed border-green-400 px-6 pt-1 pb-6 md:pt-2 md:pb-6 md:px-4">
          <h1 className="text-xl font-bold mb-1">Actions</h1>
          <div className="flex flex-col md:flex-row">
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
                      onChange={handleNewGiftInputChange}
                      className="border-2 border-black px-1 my-2 w-36 md:w-44"/>
                  </div>
                  <div className="flex flex-col justify-end mx-2">
                    <button 
                      className="border-2 border-black px-2 my-2 text-sm rounded hover:bg-green-400 md:text-base"
                      onClick={handleAddGift}
                      disabled={(newGiftInput === '' ? true : false)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-2 border-gray p-2 mt-2 md:mt-0 md:w-1/2 md:mx-2">
              <div className="flex flex-col">
                <h1 className="font-bold text-sm md:text-base">Update Gift Owner</h1>
                <div className="flex flex-col mx-auto xl:flex-row xl:justify-between">
                  <div className="mx-auto md:mx-2">
                    <Select options={players} label='Player' currentValue={currentPlayerSelectValue} onValueChange={handlePlayerChange}/>
                  </div>
                  <div className="mx-auto md:mx-2">
                    <Select options={gifts} label='Gift' currentValue={currentGiftSelectValue} onValueChange={handleGiftChange}/>
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
            <div className="flex justify-center mt-6 md:mx-2 md:items-center md:mt-0">
              <button className="border-2 border-black px-2 h-1/2 text-sm rounded hover:bg-green-400 md:text-base md:h-1/3 xl:h-1/2">Advance to Next Opener</button>
            </div>
          </div>
        </div>
        <div className="border-2 border-green-400 border-dashed mt-6 px-6 pt-1 pb-6 md:pt-2 md:pb-6 md:px-4">
          <h1 className="text-xl font-bold mb-1">Info</h1>
          <div className="border-2 border-gray p-2 mx-auto md:w-1/2">
            <h1 className="font-bold text-sm md:text-base">Unopened Gifts Remaining</h1>
            <p className="text-sm md:text-base">{unopenedGiftsRemaining}</p>
          </div>
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
          <div className="flex flex-col md:flex-row md:mt-6">
            <div className="border-2 border-gray p-2 mt-2 md:mt-0 md:w-1/2 md:mx-2">
              <h1 className="font-bold text-sm md:text-base">Active Gifts</h1>
              <ActiveGifts currentGifts={gifts} onUpdateGift={handleUpdateGift}/>
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
          >
            Complete Exchange
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExchangePage;
