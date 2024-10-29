import React from "react";

function Tips() {
	return (
		<div className='flex flex-col max-w-md mx-auto bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 p-10 mt-2 h-1/2 '>
			<span className="font-extrabold"><b>Here are some tips to help you make the most out of your to-do list app:</b></span><br />
			<ul>
				<li className="border-l m-2 p-2 hover:m-3 shadow-xl hover:bg-amber-500 hover:text-black"><b>Prioritize Tasks:</b> Start by listing your tasks in order of importance. This helps you focus on what needs to be done first.</li><br />
				<li className="border-l m-2 p-2 hover:m-3 shadow-xl hover:bg-amber-500 hover:text-black"><b>Set Deadlines:</b> Assign due dates to your tasks to keep yourself on track and avoid procrastination</li><br />
				<li className="border-l m-2 p-2 hover:m-3 shadow-xl hover:bg-amber-500 hover:text-black"><b>Break Down Tasks:</b> Divide larger tasks into smaller, manageable steps. This makes them less overwhelming and easier to complete.</li><br />
				<li className="border-l m-2 p-2 hover:m-3 shadow-xl hover:bg-amber-500 hover:text-black"><b>Use Reminders:</b> Set reminders for important tasks to ensure you don't forget them.</li><br />
			</ul>
		</div>
	)
}

export default Tips;
