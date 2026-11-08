from typing import TypedDict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langgraph.graph import StateGraph, START, END
from pydantic import BaseModel


class AgentState(TypedDict):
    request: str
    plan: str
    review: str


class AgentRequest(BaseModel):
    request: str


def planner(state: AgentState) -> AgentState:
    return {
        **state,
        "plan": f"Plan drafted for: {state['request']}\n1. Clarify requirements\n2. Implement the smallest useful scope\n3. Validate the result",
    }


def reviewer(state: AgentState) -> AgentState:
    return {
        **state,
        "review": f"Reviewer approved the plan with scope: {state['plan'].splitlines()[0]}",
    }


def create_graph():
    graph = StateGraph(AgentState)
    graph.add_node("planner", planner)
    graph.add_node("reviewer", reviewer)
    graph.add_edge(START, "planner")
    graph.add_edge("planner", "reviewer")
    graph.add_edge("reviewer", END)
    return graph.compile()


agent_graph = create_graph()
app = FastAPI(title="Bounty Hunt Agents")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/agents/run")
def run_agents(payload: AgentRequest):
    return agent_graph.invoke({"request": payload.request, "plan": "", "review": ""})


@app.get("/health")
def health():
    return {"status": "ok"}
