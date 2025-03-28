from fastapi import FastAPI, UploadFile, Form
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import os
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development. Specify origins in production.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Initialize the Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Define request schema
class ChatRequest(BaseModel):
    user_message: str
    context: list = []

@app.post("/chat/")
async def chat_endpoint(chat_request: ChatRequest):
    """
    Endpoint to handle chat messages from React frontend.
    """
    system_context = """
    You are HomeFix Buddy, a specialized home maintenance assistant for the HomeFix website.
    Your responses should be:
    - Concise and practical
    - Professional yet friendly
    - Provide clear, actionable advice
    
    Areas of Expertise:
    1. Plumbing issues and repairs
    2. Electrical system maintenance
    3. HVAC troubleshooting
    4. Painting and renovation tips
    5. Home cleaning techniques
    6. Roofing maintenance
    7. Landscaping advice
    8. Appliance repair guidance
    """

    # Add previous conversation context
    context_history = "\n".join(
        [f"User: {msg['user']}\nAssistant: {msg['assistant']}" for msg in chat_request.context]
    )
    full_context = system_context + "\n" + context_history

    try:
        # Call Groq API
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": full_context},
                {"role": "user", "content": chat_request.user_message},
            ],
            model="llama3-8b-8192",
            stream=False,
        )

        assistant_reply = response.choices[0].message.content
        return {"assistant_reply": assistant_reply}
    except Exception as e:
        return {"error": str(e)}

