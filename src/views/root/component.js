import React, { Component } from "react";

// UTILS
import { Input, Card, Statistic, Collapse  } from "antd";
import axios from "axios";
import _ from "lodash";

export default class extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			error: null
		};
	}

	render() {
		const { value, error } = this.state;
		return (
			<div style={{ margin: "auto", width: "80%", maxWidth: "500px" }}>
				<h1 style={{ color: "white" }}>Roman Numerals Converter</h1>

				<Card>
					<Input
						placeholder="Enter a Roman Numeral or a number"
						onChange={e => this.handleInput(e.target.value)}
						style={{ marginBottom: "20px" }}
					/>

					{
						_.isError(error) ? (
							<Card style={{ overflow: "auto"}}>
								<Statistic
									title="Something went wrong..."
									value={error.message}
								/>
							</Card>
						) : !_.isNil(value) && (
							<Card style={{ overflow: "auto"}}>
								<Statistic
									title="Converted Value"
									value={value}
								/>
							</Card>
						)
					}

					<Collapse bordered={false} style={{ marginTop: "20px" }}>
						<Collapse.Panel header="Notes" key="1" style={{ padding: 0, border: 0 }}>
							<span>
								The validation is very basic where the Roman numeral is just
								analyzed to see if it contains a number, which would result in
								an invalid roman numeral format. It does not consider the validity
								of the roman numeral, for example. This is to not overdo the
								assignment as the requirements of the excersice did not specify
								user input sanitization.
							</span>
						</Collapse.Panel>
					</Collapse>
				</Card>
			</div>
		);
	}

	handleInput(value) {
		// The following few lines of code are for adding delay before making the request
		const { timeout } = this.state;
		clearTimeout(timeout);

		this.setState({
			timeout: setTimeout(async () => {
				const toReturn = await convert(value);

				if(_.isError(toReturn)) this.setState({ error: toReturn, value: null });
				else this.setState({ value: toReturn, error: null });
			}, 500)
		});
	}
}

/**
 * CONVERT
 *
 * This returns the converted value that was calculated by the server. This function
 * expects a single parameter to be converted. It can be a String or a number.
 * The server is known to handle the ambiguity.
 */
const apiUrl = "http://localhost:8080/roman-numerals-converter.service/convert";
async function convert(value) {
	return axios(
		apiUrl,
		{
			method: "GET",
			params: {
				value: encodeURIComponent(value)
			}
		}
	)
	.then(response => response.data)
	.catch(error => {
		if (error.response) {
			// The request was made and the server responded with a status code that falls out of the range of 2xx
			console.log(error.response)
			return new Error(error.response.statusText);
		} else {
			// Something happened in setting up the request that triggered an Error
			return new Error(error.message);
		}
	});
}