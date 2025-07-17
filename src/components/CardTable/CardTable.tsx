import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	createColumnHelper,
} from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import type { Card } from "@/types/card";

type Props = {
	data: Array<Card>;
	setData: React.Dispatch<React.SetStateAction<Array<Card>>>;
};

const columnHelper = createColumnHelper<Card>();

const CardTable: React.FC<Props> = ({ data, setData }) => {
	const setAsDefault = (id: string) => {
		setData((prev) => {
			const updated = prev.map((card) => ({
				...card,
				isDefault: card.id === id,
			}));
			localStorage.setItem("cards", JSON.stringify(updated));
			return updated;
		});
	};

	const deleteCard = (id: string) => {
		setData((prev) => {
			const updated = prev.filter((card) => card.id !== id);
			localStorage.setItem("cards", JSON.stringify(updated));
			return updated;
		});
	};

	const columns = [
		columnHelper.accessor("brand", {
			header: "Brand",
			cell: (info) => {
				const brand = info.getValue().toLowerCase();
				return (
					<img
						src={`/brands/${brand}.png`}
						alt={brand}
						className="w-[80px] h-[50px] object-contain mx-auto"
					/>
				);
			},
		}),
		columnHelper.accessor("last4", {
			header: "Last 4 Digits",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("isDefault", {
			header: "Default",
			cell: (info) => (info.getValue() ? "✅" : "—"),
		}),
		columnHelper.display({
			id: "actions",
			header: "Action",
			cell: ({ row }) => {
				const card = row.original;
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="p-2 hover:bg-gray-100 rounded cursor-pointer">
								<MoreVertical className="h-4 w-4" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-white shadow-md flex flex-col items-center">
							{!card.isDefault && (
								<DropdownMenuItem
									style={{
										backgroundColor: "transparent",
									}}
									className="cursor-pointer transition-transform duration-250 ease-in-out hover:scale-110"
									onClick={() => setAsDefault(card.id)}
								>
									Set as default
								</DropdownMenuItem>
							)}
							<DropdownMenuItem
								onClick={() => deleteCard(card.id)}
								style={{
									color: "#ef4444",
									backgroundColor: "transparent",
								}}
								className="cursor-pointer transition-transform duration-250 ease-in-out hover:scale-110 hover:bg-transparent focus:bg-transparent"
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		}),
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-b-md">
			<table className="w-full text-sm shadow-[0_10px_24px_rgba(0,0,0,0.08)] p-4 rounded-md bg-white">
				<thead className="bg-gray-100 text-center">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="px-4 py-2 font-semibold">
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="border-t border-gray-300">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="px-4 py-2 text-center">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CardTable;
