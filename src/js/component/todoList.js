import React, { useEffect, useState } from "react";

export const TodoList = () => {
	//fetch("https://assets.breatheco.de/apis/fake/todos/user/lucciii33")
	//.then((res) => res.json())
	//.then((data) => console.log(data));

	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);

	const url = "https://assets.breatheco.de/apis/fake/todos/user/lucciii33";
	useEffect(() => getFetch(), []);

	function getFetch(params) {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then((responseAsJson) => {
				// Do stuff with the JSONified response
				console.log(responseAsJson);
			})
			.catch((error) => {
				console.log("Looks like there was a problem: \n", error);
			});
	}

	function putFetch(taskArr) {
		fetch(url, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(taskArr), // data can be a `string` or  an {object} which comes from somewhere further above in our application
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then((responseAsJson) => {
				// Do stuff with the JSONified response
				console.log(responseAsJson);
			})
			.catch((error) => {
				console.log("Looks like there was a problem: \n", error);
			});
	}

	function onChange(e) {
		const newValue = e.target.value;
		setInputValue(newValue);
	}

	function Addtask(e) {
		if (e.keyCode == 13) {
			setList([...list, { label: inputValue, done: false }]);
			setInputValue("");
			putFetch([...list, { label: inputValue, done: false }]);
		}
	}

	function handleRemove(index) {
		setList(list.filter((remove, i) => i != index));
	}

	return (
		<div>
			<input
				className="input"
				type="text"
				onChange={onChange}
				onKeyDown={Addtask}
				value={inputValue}
			/>
			<ul>
				{list.map((task, index) => {
					return (
						<li className="list" key={index}>
							{task.label}
							<span
								className="ms-3"
								onClick={() => handleRemove(index)}>
								<i className="fas fa-trash"></i>
							</span>
						</li>
					);
				})}
			</ul>
			<div>
				<em>
					{list.length == 0 ? "no tasks" : `${list.length} tasks `}
				</em>
			</div>
		</div>
	);
};
