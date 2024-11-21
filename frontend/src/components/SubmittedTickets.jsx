import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAllTickets } from "../store/home.store";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

function SubmittedTickets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const response = useSelector((state) => state.HomeStore.userAllTickets);

  useEffect(() => {
    dispatch(getUserAllTickets({ userID: "jake@gmail.com" }));
  }, [dispatch]);

  const handleCardClick = (ticket) => {
    // Navigate to the detail page and pass the ticket data
    navigate("/user/SubmittedTickets/ticket-detail", { state: ticket });
  };

  return (
    <div>
      <div>
        <p
          className=" text-4xl font-medium"
          style={{ marginTop: "2%", marginLeft: "2%" }}
        >
          Welcome Jake
        </p>

        <p style={{ margin: "2%" }}>
          Tickets created by you are available below
        </p>

        {/** Table of Tickets */}

        <div className=" flex flex-col" style={{ marginLeft: "8%" }}>
          {/**Title */}
          <div
            className=" flex flex-row justify-between  items-center bg-gray-900 "
            style={{ width: "92%", padding: "0.8%" }}
          >
            <p className="w-1/6 text-center text-xl font-medium text-gray-200">
              Ticket ID
            </p>

            <p className="w-1/6 text-center text-xl font-medium text-gray-200 ">
              Ticket Creation Date
            </p>
            <p className="w-4/6 text-center text-xl font-medium text-gray-200">
              Ticket Content
            </p>
          </div>
          {response && response["result"]?.length > 0 ? (
            response["result"].map((ticket, index) => (
              <Card
                key={index}
                variant="outlined"
                style={{ marginBottom: "10px", padding: "10px" }}
                onClick={() => handleCardClick(ticket)}
              >
                {/**Row Entries */}
                <div
                  className=" flex flex-row justify-between border-2  items-center shadow-md"
                  style={{ width: "92%" }}
                >
                  <p
                    className="w-1/6 text-center text-md font-medium border-2  text-gray-700 hover:bg-zinc-100 transition transform ease-in-out hover:cursor-pointer"
                    style={{ padding: "0.8%" }}
                  >
                    {ticket.ticket_id}
                  </p>
                  <p
                    className="w-1/6 text-center text-md font-medium border-2  text-gray-700 hover:bg-zinc-100 transition transform ease-in-out hover:cursor-pointer"
                    style={{ padding: "0.8%" }}
                  >
                    {ticket.created_at}
                  </p>
                  <p
                    className="w-4/6 text-center text-md font-medium border-2  text-gray-700 hover:bg-zinc-100 transition transform ease-in-out hover:cursor-pointer"
                    style={{ padding: "0.8%" }}
                  >
                    {ticket.message}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <p>Loading tickets...</p> // Display a loading message if data isn't available
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default SubmittedTickets;
