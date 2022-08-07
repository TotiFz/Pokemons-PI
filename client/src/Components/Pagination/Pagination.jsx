import React from 'react';

const Pagination = ({ page, offset, setOffset, setPage, maxPage }) => {
	const numPokemons = 12;
	const next = () => {
		if (page < maxPage) {
			setOffset(offset + numPokemons);
			setPage(page + 1);
		}
	};
	const previous = () => {
		if (page > 1) {
			setOffset(offset - numPokemons);
			setPage(page - 1);
		}
	};

	return (
		<div className="pagination">
			<button className="btn-page" onClick={previous}>
				PREVIOUS
			</button>
			<span className="num-page">{page}</span>
			<button className="btn-page" onClick={next}>
				NEXT
			</button>
		</div>
	);
};

export default Pagination;
