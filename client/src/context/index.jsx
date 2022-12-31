import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x7A0849F28f0113B7dfDEABE5b894032d37945340');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try{
            const data = await createCampaign([
                address, //owner
                form.title, //title of Campaign
                form.description, //description of Campaign
                form.target, //Goal
                new Date(form.deadline).getTime(), //Deadline
                form.image, //Image
            ])

            console.log('Contract Call Success', data)
        } catch (error) {
            console.log('Error: Contract Call Failed', data)
        }
    }

    return (
        <StateContext.Provider
            value={{ 
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

// Custom Hook
export const useStateContext = () => useContext(StateContext)