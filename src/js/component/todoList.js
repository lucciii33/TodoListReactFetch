import React, { useState } from "react";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setList] = useState([]);

	function onChange(e) {
		const newValue = e.target.value;
		setInputValue(newValue);
	}
	function Addtask(e) {
		if (e.keyCode == 13) {
			setList([...list, inputValue]);
			setInputValue("");
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
							{task}
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
