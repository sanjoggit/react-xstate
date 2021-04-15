import { Machine, assign } from "xstate";
import axios from "axios";

const urlCountries = "https://covid19.mathdro.id/api/countries";

const fetchCovidByCountrySuccess = assign((context, event) => {
	return {
		countryData: event.data
	}
})

const fetchCovidByCountry = async (context, event) => {
	const countryData = await axios.get(urlCountries+'/'+event.country);
	return countryData.data;
}

const clearPreviousData = assign ((context, event) => {
	if(context.countryData === null) {
		return;
	}
	return {
		countryData: null
	}
})

export const covidCountryMachine = Machine({
	id: "covidByCountry",
	initial: "idle",
	context: {
		countryData: null
	},
	states: {
		idle: {
			on: {
				FETCH_COVID_DATA_COUNTRY: {
					target: "loading",
				},
			},
		},
		loading: {
			invoke: {
				id: "fetch-covid-data-country",
				src: fetchCovidByCountry,
				onDone: {
					target: "success",
					actions: fetchCovidByCountrySuccess
				},
				onError: {
					target: "failure",
				}
			}
		},
		success: {
			on: {
				FETCH_COVID_DATA_COUNTRY: {
					target: "loading",
					actions: clearPreviousData
				}
			}
		},
		failure: {
			on: {
				FETCH_COVID_DATA_COUNTRY: {
					target: "loading"
				}
			}
		}
	},
}, {actions: {fetchCovidByCountrySuccess, clearPreviousData}, services: {fetchCovidByCountry}});
