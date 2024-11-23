import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitNewTicket } from "../store/home.store";

function CreateTicket() {
  const [input, setInput] = useState({});

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const submitRequest = (event) => {
    event.preventDefault();

    dispatch(submitNewTicket({ message: input.message }));
    setInput({});
  };

  return (
    <div>
      <div className="snap-always snap-center">
        <div
          className=" flex justify-center flex-col items-center"
          style={{ marginTop: "6%" }}
        >
          <p className=" text-5xl  font-bold text-center text-blue-950">
            Create a Ticket
          </p>
        </div>
        <div
          className=" text-gray-600 flex flex-row justify-around relative"
          style={{
            marginLeft: "15%",
            marginRight: "15%",
            marginTop: "2%",
            marginBottom: "4%",
          }}
        >
          <div className=" w-1/2 h-1/2 ">
            <form
              className="flex flex-col justify-center h-full "
              onSubmit={submitRequest}
            >
              <label
                className="text-blue-950"
                htmlFor="message"
                style={{ marginTop: "5%", marginBottom: "2%" }}
              >
                {" "}
                Issue
              </label>
              <textarea
                type="text"
                name="message"
                value={input.message || ""}
                onChange={handleChange}
                placeholder=" type your concern in here ..."
                required
                className=" border-2 border-blue-950 rounded-lg h-1/2 px-2"
              />
              <div className=" flex flex-row justify-end">
                <button
                  type="submit"
                  value="Send"
                  className=" transition ease-in-out duration-75 rounded-full font-medium bg-blue-600 text-gray-200 hover:bg-blue-700 cursor-pointer p-2 my-8 text-lg w-3/12 items-center "
                  style={{ marginLeft: "4.3%" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
