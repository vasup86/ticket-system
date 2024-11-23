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
    dispatch(getUserAllTickets({}));
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
          style={{ marginTop: "2%", marginLeft: "8%" }}
        >
          Welcome
        </p>

        <p style={{ marginTop: "2%", marginLeft: "8%", marginBottom: "1%" }}>
          Tickets created by you are available below
        </p>

        {/** Table of Tickets */}

        <div className=" flex flex-col" style={{ marginLeft: "8%" }}>
          {/**Title */}
          <div
            className=" flex flex-row justify-between  items-center bg-blue-900 "
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
          {response && response["result"]?.length === 0 ? (
            <div>No submitted tickets</div>
          ) : (
            <></>
          )}
          {response && response["result"]?.length > 0 ? (
            response["result"].map((ticket, index) => (
              <div>
                {" "}
                <Card
                  key={index}
                  variant="outlined"
                  onClick={() => handleCardClick(ticket)}
                >
                  {/**Row Entries */}
                  <div
                    className=" flex flex-row justify-between   items-center shadow-md"
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
              </div>
            ))
          ) : (
            <></>
          )}
          {!response && <p>Loading tickets...</p>}
        </div>
      </div>
    </div>
  );
}

export default SubmittedTickets;
