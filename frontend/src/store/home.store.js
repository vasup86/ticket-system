import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: false,
  response: [],
  input: [],
  userAllTickets: [],
  agentAllTickets: [],
  userEmail: "",
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    saveInput: (state, input) => {
      state.input.push(input.payload);
    },
    clearResponseAndInput: (state) => ({
      ...state,
      error: false,
      response: [],
      input: [],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(submitNewTicket.pending, (state, action) => {
      state.isLoading = true;
    });
    // No response, action.payload will be the reponse.json()
    builder.addCase(submitNewTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.response.push(action.payload.result);
    });
    builder.addCase(submitNewTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });

    // Get User Tickets
    builder.addCase(getUserAllTickets.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAllTickets.fulfilled, (state, action) => {
      state.userAllTickets = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserAllTickets.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Get Agent Tickets
    builder.addCase(getAgentAllTickets.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAgentAllTickets.fulfilled, (state, action) => {
      state.agentAllTickets = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAgentAllTickets.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userEmail = action.payload;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.userEmail = "jake@gmail.com";
      state.isLoading = false;
    });
  },
});

// Async actions to fetch data from api

// Create a new ticket
export const submitNewTicket = createAsyncThunk(
  "submitNewTicket",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    return await fetch("/createTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        userID: state.HomeStore.userEmail,
      }),
    })
      .then((res) => {
        if ((res.status >= 200 && res.status <= 299) || res.status === 406) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        if (res.errorType) {
          throw new Error(res.message);
        }
        return res;
      });
  }
);

// Get all the tickets submitted by the user
export const getUserAllTickets = createAsyncThunk(
  "getUserAllTickets",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    return await fetch("/getUserAllTickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: state.HomeStore.userEmail }),
    })
      .then((res) => {
        // handle success (200-209) and custom server error 406
        if ((res.status >= 200 && res.status <= 299) || res.status === 406) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        // Throw error if flask throws an error
        if (res.errorType) {
          throw new Error(res.message);
        }
        return res;
      });
  }
);

// Get all the tickets assigned to the admin
export const getAgentAllTickets = createAsyncThunk(
  "getAgentAllTickets",
  async (data) => {
    return await fetch("/getAgentAllTickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if ((res.status >= 200 && res.status <= 299) || res.status === 406) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((res) => {
        // Throw error if flask throws an error
        if (res.errorType) {
          throw new Error(res.message);
        }
        return res;
      });
  }
);

// handle login
export const login = createAsyncThunk("login", async (data) => {
  return await fetch(
    "https://fleetrewards-copy-1-group2.up.railway.app/api/users",
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return [];
    })
    .then((res) => {
      if (res.length === 0) {
        return "jake@gmail.com";
      }
      console.log(res);
      console.log(data);
      const result = res.find((user) => user.email === data.email);
      return result ? result.email : "";
    });
});

export const { saveInput, clearResponseAndInput } = homeSlice.actions;

export default homeSlice.reducer;
