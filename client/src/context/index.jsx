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

    // GET Campaigns
    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i,
        }))

        return parsedCampaigns;
    }


    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => 
            campaign.owner === address);

        return filteredCampaigns;
    }

    return (
        <StateContext.Provider
            value={{ 
                address,
                contract,
                connect,
                getCampaigns,
                getUserCampaigns,
                createCampaign: publishCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

// Custom Hook
export const useStateContext = () => useContext(StateContext)