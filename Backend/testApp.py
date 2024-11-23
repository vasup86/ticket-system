import unittest
from app import app, socketio
from flask import json
from unittest.mock import patch

class TestApp(unittest.TestCase):
    def setUp(self):
        # Setup test client
        self.app = app.test_client()
        self.app.testing = True
#Testing connectivity to homepage
    def test_homepage(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"result": "connected"})

#Checks for the functionality of Create Ticket method in app.py on successful input and error
    @patch('app.createTicket')
    def test_create_ticket_success(self, mock_create_ticket):
        mock_create_ticket.return_value = "success"
        payload = {"userID": "123", "message": "Test ticket"}
        response = self.app.post('/createTicket', json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"result": "Created ticket successfully"})

    @patch('app.createTicket')
    def test_create_ticket_error(self, mock_create_ticket):
        mock_create_ticket.return_value = "error"
        payload = {"userID": "123", "message": "Test ticket"}
        response = self.app.post('/createTicket', json=payload)
        self.assertEqual(response.status_code, 406)
        self.assertEqual(response.json, {
            "errorType": 406,
            "result": "Error when creating the ticket"
        })

#Checks for the functionality of getUserAllTickets which displays the list of user tickets by creating a set of method in app.py on successful input and error
    @patch('app.getUserAllTickets')
    def test_get_user_all_tickets(self, mock_get_user_all_tickets):
        mock_get_user_all_tickets.return_value = [{"id": 1, "message": "Ticket 1"}]
        payload = {"userID": "123"}
        response = self.app.post('/getUserAllTickets', json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"result": [{"id": 1, "message": "Ticket 1"}]})

    @patch('app.getAgentAllTickets')
    def test_get_agent_all_tickets(self, mock_get_agent_all_tickets):
        mock_get_agent_all_tickets.return_value = [{"id": 1, "message": "Agent Ticket 1"}]
        payload = {"agentID": "456"}
        response = self.app.post('/getAgentAllTickets', json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"result": [{"id": 1, "message": "Agent Ticket 1"}]})

    @patch('app.getTicketMessages')
    def test_get_ticket_messages(self, mock_get_ticket_messages):
        mock_get_ticket_messages.return_value = [{"id": 1, "message": "Message 1"}]
        payload = {"ticketID": 789}
        response = self.app.post('/getTicketMessage', json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"result": [{"id": 1, "message": "Message 1"}]})

    def test_socketio_send_message(self):
        # Simulate a SocketIO connection
        client = socketio.test_client(app)
        data = {
            "ticketID": 1,
            "userID": "123",
            "agentID": "456",
            "creator": "user",
            "message": "Hello!"
        }
        client.emit('send_message', data)
        received = client.get_received()
        self.assertEqual(len(received), 1)
        self.assertEqual(received[0]['name'], 'receive_message')
        self.assertEqual(received[0]['args'][0], data)

    def tearDown(self):
        pass

if __name__ == "__main__":
    unittest.main()