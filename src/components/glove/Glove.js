import React, { useEffect, useState } from "react";
import axios from "axios";
import {
	AutoSizer,
	List,
	CellMeasurerCache,
	CellMeasurer,
} from "react-virtualized";

const Glove = () => {
	const [gloves, setGloves] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const cache = React.useRef(
		new CellMeasurerCache({
			fixedWidth: true,
			defaultHeight: 100,
		})
	);

	useEffect(() => {
		getGloves();
	}, []);

	const getGloves = () => {
		axios
			.get("/v2/products/gloves")
			.then((data) => {
				setGloves(data.data);
				setLoaded(true);
			})
			.catch((err) => console.log("FETCH ERROR:", err));
	};

	return (
		<div>
			{!loaded && <div>loading</div>}
			<div style={{ width: "100%", height: "100vh" }}>
				<AutoSizer>
					{({ width, height }) => (
						<List
							width={width}
							height={height}
							rowHeight={cache.current.rowHeight}
							deferredMeasurementCache={cache.current}
							rowCount={gloves.length}
							rowRenderer={({ key, index, style, parent }) => {
								const glove = gloves[index];
								return (
									<CellMeasurer
										key={key}
										cache={cache.current}
										parent={parent}
										columnIndex={0}
										rowIndex={index}
									>
										<div style={style}>
											<p>{glove.id}</p>
											<p>{glove.name}</p>
											<p>{glove.manufacturer}</p>
										</div>
									</CellMeasurer>
								);
							}}
						/>
					)}
				</AutoSizer>
			</div>
		</div>
	);
};

export default Glove;
