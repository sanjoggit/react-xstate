import { Machine, assign } from "xstate";
import axios from "axios";

const covidUrl = "https://covid19.mathdro.id/api";

const fetchCountriesSuccess = assign((context, event) => {
	return {
		countries: event.data.countries,
		global: event.data.global,
	};
});

const fetchCountries = () => {
	const countries = axios.get(covidUrl + "/countries");
	const globalData = axios.get(covidUrl);
	return axios
		.all([countries, globalData])
		.then(
			axios.spread((...responses) => {
				const response1 = responses[0];
				const response2 = responses[1];
				return {
					countries: response1.data.countries,
					global: response2.data,
				};
			})
		)
		.catch((error) => console.log("error", error));
};

export const covidTrackMachine = Machine(
	{
		id: "covidTrack",
		initial: "idle",
		context: {
			countries: [],
			global: null,
		},
		states: {
			idle: {
				on: {
					FETCH_COVID_LIST: {
						target: "loading",
					},
				},
			},
			loading: {
				invoke: {
					id: "fetch-covid-list",
					src: fetchCountries,
					onDone: {
						target: "success",
						actions: fetchCountriesSuccess,
					},
					onError: {
						target: "failure",
					},
				},
			},
			success: {
				// on: {
				// 	FILTER_COUNTRY: {
				// 		target: "",
				// 		action: filterCountry
				// 	}
				// }
			},
			failure: {
				on: {
					RETRY: "loading",
				},
			},
		},
	},
	{ actions: { fetchCountriesSuccess }, services: { fetchCountries } }
);
