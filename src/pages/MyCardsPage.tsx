import { useMemo, useState, useEffect, type JSX } from "react";
import type { Card } from "@/types/card";
import CardTable from "@/components/CardTable";
import CardFilter from "@/components/CardFilter";
import CreateCardDialog from "@/components/CreateCardDialog";

const initialCards: Card[] = [
	{ id: "1", brand: "visa", last4: "1234", isDefault: true },
	{ id: "2", brand: "mastercard", last4: "5678", isDefault: false },
	{ id: "3", brand: "amex", last4: "9876", isDefault: false },
];

const MyCardsPage = (): JSX.Element => {
	const [cards, setCards] = useState<Card[]>([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		const saved = localStorage.getItem("cards");
		if (saved) {
			setCards(JSON.parse(saved) as Card[]);
		} else {
			localStorage.setItem("cards", JSON.stringify(initialCards));
			setCards(initialCards);
		}
	}, []);

	const filteredCards = useMemo(() => {
		const search = filter.toLowerCase();
		return cards.filter(
			(card) =>
				card.brand.toLowerCase().includes(search) || card.last4.includes(search)
		);
	}, [cards, filter]);

	return (
		<div className="p-4 mt-[20vh] mx-auto max-w-[900px]">
			<div className="flex items-center justify-between bg-[#3B5998] rounded-t-md shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
				<h1 className="text-2xl font-bold text-[#fff] mt-2 mb-2 ml-2">
					My Cards
				</h1>
				<CardFilter value={filter} onChange={setFilter} />
				<CreateCardDialog setCards={setCards} />
			</div>

			{filteredCards.length > 0 ? (
				<CardTable data={filteredCards} setData={setCards} />
			) : (
				<div className="bg-white p-8 my-20 mx-auto max-w-[300px] rounded-[12px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] text-center">
					No cards found
				</div>
			)}
		</div>
	);
};

export default MyCardsPage;
