import React from "react";
import { useNavigate } from "react-router-dom";

function Customer() {
  const navigate = useNavigate();

  const navigateCreateTicket = () => {
    navigate("/user/CreateTicket");
  };

  const navigateSubmittedTicket = () => {
    navigate("/user/SubmittedTickets");
  };

  return (
    <div>
      <div
        className=" flex justify-center flex-col items-center"
        style={{ marginTop: "6%" }}
      >
        <p
          className=" text-6xl  font-bold text-center text-gray-800"
          style={{ marginBottom: "1.5%" }}
        >
          Technical Support
        </p>
        <hr
          className=" bg-blue-950 h-1 opacity-70 rounded-lg "
          style={{ width: "4%", marginTop: "0.2%" }}
        />
      </div>

      <div
        className=" flex flex-row w-full justify-around items-center"
        style={{ marginTop: "5%", padding: "5%" }}
      >
        {/** Create a Ticket */}

        <div
          onClick={navigateCreateTicket}
          className=" flex flex-col text-center items-center underline text-2xl font-medium shadow-lg hover:cursor-pointer hover:bg-zinc-100 transition transform ease-in-out"
          style={{
            width: "30%",
            paddingTop: "2%",
            paddingBottom: "2%",
            transitionDelay: "35ms",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/10729/10729094.png"
            alt="Technical Ticket"
            style={{ width: "25%", marginTop: "1.5%", marginBottom: "1.5%" }}
          />
          <p> Create a Ticket</p>
        </div>

        {/** Tickets Submitted */}
        <div
          onClick={navigateSubmittedTicket}
          className=" flex flex-col text-center items-center underline text-2xl font-medium shadow-lg hover:cursor-pointer hover:bg-zinc-100 transition transform ease-in-out"
          style={{
            width: "30%",
            paddingTop: "3%",
            paddingBottom: "3%",
            transitionDelay: "35ms",
          }}
        >
          <img
            src="https://www.freeiconspng.com/uploads/to-do-list-icon-buy-this-icon-for--0-48-1.png"
            alt="Technical Tickets Submitted"
            style={{ width: "25%", marginTop: "1.5%", marginBottom: "1.5%" }}
          />
          <p> Tickets Submitted</p>
        </div>
      </div>
    </div>
  );
}

export default Customer;
