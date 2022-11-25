import { Route, Routes } from 'react-router-dom';
import Editable from '../Editable';
import ExpandedLine from '../ExpandedLine';
import Filter from '../Filter';
import Home from '../Home';
import Loading from '../Loading';
import Pagination from '../Pagination';
import Selection from '../Selection';
import Sort from '../Sort';
import { Test } from '../Test';
import Virtualized from '../Virtualized';

export default function RoutesConfig() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/selection" element={<Selection />} />
			<Route path="/expanded-line" element={<ExpandedLine />} />
			<Route path="/loading" element={<Loading />} />
			<Route path="/sort" element={<Sort />} />
			<Route path="/filter" element={<Filter />} />
			<Route path="/editable" element={<Editable />} />
			<Route path="/virtualized" element={<Virtualized />} />
			<Route path="/pagination" element={<Pagination />} />
			<Route path="/test" element={<Test />} />
		</Routes>
	);
}
