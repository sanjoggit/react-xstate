import React from 'react';
import axios from 'axios';

const Stock = ({gloveId, manufacturer}) => {

	React.useEffect(() => {
		axios.get(
			`https://bad-api-assignment.reaktor.com/v2/availability/${manufacturer}`
		).then(data => console.log('ddd', data));
	}, [manufacturer])
	
	return (
		<div>
			yes
		</div>
	)
}

export default Stock
