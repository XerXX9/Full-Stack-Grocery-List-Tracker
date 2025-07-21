# Full-Stack-Grocery-List-Tracker
![Demo](https://github.com/XerXX9/Full-Stack-Grocery-List-Tracker/blob/main/Demo.gif)
![Screenshot](image.png)

A simple, full-stack web application I built as my **first full-stack project**, designed to understand and implement every component myself using industry-standard practices.

##  Motivation

This project was my **first full-stack app**. I specifically picked a small-scope project so I could **learn every part in depth**. Rather than follow YouTube tutorials, I asked ChatGPT to suggest the tech stack, then dove into the **official docs** for React/MUI, Vite, FastAPI, PostgreSQL, and Pytest. I used their demo projects to kick things off and relied on GPT for debugging as I progressed. This was a **learning exercise** to grasp how all the pieces fit together and how to execute it in an industry standard manner.

---

##  Tech Stack

- **Frontend**: React + MUI, built with Vite  
- **Backend**: FastAPI 
- **Database**: PostgreSQL  
- **Testing**: Pytest

---

##  Features

- Modern UI with Material-UI components and responsive design
- Backend API built with FastAPI
- PostgreSQL database integration
- Thorough testing with Pytest

---

##  File Structure

```
basic-full-stack/
├── backend/
│   ├── app/             # FastAPI application code
│   ├── tests/           # Pytest test suite
│   └── requirements.txt
├── frontend/
│   ├── src/             # React components, pages
│   ├── public/
│   └── package.json     # Includes MUI & Vite setup
├── README.md
└── .gitignore
```

---

##  Installation & Setup

### Prerequisites

- Node.js  
- Python 3.10+  
- PostgreSQL

```bash
# Clone
git clone https://github.com/XerXX9/Basic-Full-Stack.git
cd Basic-Full-Stack

# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend (in a new tab)
cd ../frontend
npm install
npm run dev
```

The App should now be accessible locally (e.g., `http://localhost:5173`).

---

##  Testing

```bash
# Run backend tests
cd backend
pytest
```

---

##  What I Learned

- Building a backend API from scratch using FastAPI  
- Structuring a database-driven app with PostgreSQL  
- Crafting polished UI components with React and MUI  
- Bootstrapping a modern front-end workflow with Vite  
- Writing and organizing tests using Pytest  
- Debugging through static types, docs, and GPT support

---

##  Thank You

Huge thanks to **[Sebastián Ramírez](https://twitter.com/tiangolo)** — the creator of FastAPI and SQLModel — for his **exceptionally clear, concise, and helpful documentation**. The quality of the docs made it not only possible but enjoyable to build with these tools, especially as a first-timer.

---

##  Contributing

This was a solo learning effort, but feel free to fork it and expand!

---

##  License

[MIT License](./LICENSE)
