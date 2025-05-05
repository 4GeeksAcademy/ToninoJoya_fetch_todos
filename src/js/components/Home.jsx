import React, { useEffect, useState } from "react";

const urlBase = "https://playground.4geeks.com/todo"

//create your first component
const Home = () => {

	const [data, setData] = useState({
		label: "",
		is_done: false
	});

	const [listData, setListData] = useState([]);


	const handleOnChange = (event) => {
		console.log(event.target.value)

		setData({
			...data,
			label: event.target.value
		})

	}
	const addTask = async (event) => {

		if (event.key == "Enter" && data.label.trim() !== "") {
			try {
				const response = await fetch(`${urlBase}/todos/demian`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				})
				if (response.ok) {
					getAlltask()
					setData({
						label: "",
						is_done: false
					})
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	const deleteTask = async (id) => {

		try {
			const response = await fetch(`${urlBase}/todos/${id}`, {
				method: "DELETE"
			})
			if (response.ok) {
				getAlltask()
			}

		} catch (error) {
			console.log("paso algo")
		}

	}

	// const newList = listData.filter((task, indiceDelElemento) => indiceDelElemento != index)

	// setListData(newList);


	const stopFormDefault = (event) => {
		event.preventDefault()
	}

	const getAlltask = async () => {
		try {
			const response = await fetch(`${urlBase}/users/demian`)
			const datos = await response.json()

			if (response.ok) {
				setListData(datos.todos)
			}
			console.log(datos.todos)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getAlltask()
	}, [])


	return (<div className="container p-4">
		<div className="row justify-content-center">
			<div className="col-12 col-md-7">
				<h1 className="text-center text-danger">todos</h1>
				<form className="border p-0 mb-2"
					onSubmit={stopFormDefault}>
					<input type="text"
						className="border-0 px-3 py-2 border-bottom"
						placeholder="What needs to be done"
						name="task"
						value={data.label}
						onChange={handleOnChange}
						onKeyDown={addTask}
					/>
					<ul className="list-group list-group-flush">

						{listData.map((item) => (
							<li key={item.id}
								className="list-group-item"
							>{item.label}
								<span className="d-flex justify-content-end p-2"
									onClick={() => deleteTask(item.id)}>
									<i className="fa-solid fa-xmark cruz"
										onClick={() => deleteTask(item.id)}></i></span>
							</li>
						))}
						<div className="p-2 align-text-bottom suma ">{`${listData.length} items left`}</div>
					</ul>


				</form>
			</div>
		</div>
	</div >

	);
};

export default Home;