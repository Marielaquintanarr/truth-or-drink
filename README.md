
## 🍸 Truth or Drink

Truth or Drink is a fun, multiplayer web game where players take turns answering bold questions — or taking a drink instead.  
This project is divided into two main parts:
- **Frontend:** Built with React + Vite  
- **Backend:** Built with Go, connected to a Supabase database that stores all the questions

Try it now! https://truthordrinkmq.netlify.app/


## Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** for styling
- **React Router** for navigation

### Backend
- **Go (Golang)**
- **Supabase** (PostgreSQL) as the database
- **CORS** enabled for communication with the frontend

## How It Works

1. The **frontend** handles all user interaction — joining the game, answering questions, and tracking rounds.
2. The **backend** connects to **Supabase**, where all questions are stored.
3. When a new question is needed, the frontend sends a `GET` request to the backend, which fetches a random question from the database and returns it.


## Author
Developed by **[Mariela Quintanar](https://github.com/Marielaquintanarr)**

