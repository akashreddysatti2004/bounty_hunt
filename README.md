# Bounty Hunt

A three-service dummy bounty marketplace starter for Angular, ASP.NET Core, and LangGraph agents.

## Projects

- `client/` - Angular frontend
- `Api/` - ASP.NET Core Web API
- `agents/` - FastAPI and LangGraph agent service

## Run locally

Start the API:

```bash
dotnet run --project Api/Api.csproj
```

Start the agent service:

```bash
python3 -m pip install -r agents/requirements.txt
python3 -m uvicorn agents.main:app --reload --port 8000
```

Start Angular:

```bash
cd client
npm install
npm start
```

Open http://localhost:4200. The API runs on http://localhost:5080 and the agent service on http://localhost:8000/docs.