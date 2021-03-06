import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";


import RoomsInformation from "./RoomsInformation/RoomsInformation";
import PreferencesInformation from "./PreferencesInformation/PreferencesInformation";
import AdditionalInformation from "./AdditionalInformation";

import { getFilterOptions } from "../../mockData";
import HighlightedText from "./HighlightedText";

const QuantifiedItem = styled.span`
	font-family: sans-serif;
	font-weight: bold;
	color: #4cbcecb2;
	font-size: 1.1em;

	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

	background-color: #c9e6f2a6;
	border-radius: 3px;
	padding: 1px 5px;
`;
const PushedDiv = styled.div`
	display: inline-flex;
	flex-direction: column;
	align-items: stretch;
	margin-top: 10px;
	margin-bottom: 10px;

	margin-left: 4px;
	margin-right: 4px;

	padding: 7px;
	border-radius: 5px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	width: max(calc(50% - 30px), 550px);

	@media (max-width: 500px) {
		width: 100%;
	}

	background-color: #dfdfdf76;
`;

const QuantityInformation = styled.span`
	display: inline-flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;

	padding: 0 7px 7px 0;

	border-radius: 5px;

	gap: 3.5px;

	font-family: sans-serif;
	font-weight: bold;

	color: #414141;
`;

const PushedDownDiv = styled.div`
	padding-top: 14px;
	display: flex;
	flex-direction: column;
	gap: 21px;
`;

const Header = styled.div`
	padding-bottom: 20px;
	font-family: sans-serif;
	font-weight: bold;

	color: #454343;

	display: flex;
	gap: 7px;
	justify-content: space-between;

	@media (max-width: 540px) {
		flex-wrap: wrap;
	}
`;

const ShadowedHighlightedText = styled(HighlightedText).attrs(() => ({
	backgroundColor: "#ffffff",
}))`
	white-space: nowrap;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

function OfferPanel({ offerData, className, children }) {
	const offerId = offerData["_id"];

	const numberOfPeople = offerData.numberOfPeople;
	const roomsWanted = offerData.roomsWanted;
	const numbeOfRoomsAvailable = offerData.rooms.length;

	const rooms = offerData.rooms;
	const preference = offerData.preference;
	const options = getFilterOptions()["rooms"]["criteria"];

	const dateCreated = offerData["dateCreated"];
	const username = offerData["user"]["username"];
	const additionalInformation = offerData["additionalInformation"];

	return (
		<PushedDiv className={className}>
			<Header>
				<ShadowedHighlightedText>
					{dayjs(dateCreated).format("ddd, D MMM YYYY")}
				</ShadowedHighlightedText>
				<ShadowedHighlightedText>{username}</ShadowedHighlightedText>
				{children}
			</Header>
			<QuantityInformation>
				<QuantifiedItem>
					{numberOfPeople}{" "}
					<span>{numberOfPeople > 1 ? "people" : "person"}</span>
				</QuantifiedItem>
				<span>having</span>
				<QuantifiedItem>
					{numbeOfRoomsAvailable}{" "}
					<span>{numbeOfRoomsAvailable > 1 ? "rooms" : "room"}</span>
				</QuantifiedItem>
				<span>looking</span>
				<span>for</span>
				<QuantifiedItem>
					{roomsWanted}{" "}
					<span>{roomsWanted > 1 ? "rooms" : "room"}</span>
				</QuantifiedItem>
			</QuantityInformation>
			<PushedDownDiv>
				<RoomsInformation rooms={rooms} />
				<PreferencesInformation
					preference={preference}
					options={options}
				/>
				<AdditionalInformation text={additionalInformation} />
			</PushedDownDiv>
		</PushedDiv>
	);
}

export default OfferPanel;
