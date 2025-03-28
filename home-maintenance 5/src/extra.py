import streamlit as st
import os
from dotenv import load_dotenv
from groq import Groq
import speech_recognition as sr
import tempfile
import soundfile as sf
import numpy as np
import edge_tts
import asyncio

# Load environment variables from .env file
load_dotenv()

# Initialize the Groq client using the API key from environment variables
client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
)

# Set the page title for Streamlit app
st.set_page_config(page_title="HomeFix Buddy - Home Maintenance Assistant", page_icon="🏠")

# Title of the app
st.title("🏠 HomeFix Buddy - Your Home Maintenance Assistant")
st.sidebar.markdown("HomeFix\nComprehensive Home Maintenance Support")

# Initialize chat history and context in session state
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "Welcome to HomeFix Buddy! I'm here to help you with all your home maintenance needs. What home repair or maintenance question can I assist you with today?"}
    ]

# Initialize conversation context if not exists
if "conversation_context" not in st.session_state:
    st.session_state.conversation_context = []

# Function to manage conversation context
def update_conversation_context(user_message, assistant_reply):
    # Limit context to last 10 exchanges to prevent excessive token usage
    if len(st.session_state.conversation_context) >= 10:
        st.session_state.conversation_context.pop(0)
    
    # Add the current exchange to context
    st.session_state.conversation_context.append({
        "user": user_message,
        "assistant": assistant_reply
    })

# Modify system context to include conversation history
def prepare_system_context():
    # Base system context
    base_context = """
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
    
    Key Principles:
    - Prioritize safety in all recommendations
    - Offer step-by-step guidance
    - Distinguish between DIY-friendly and professional-required tasks
    - Provide cost-effective solutions
    
    Previous Conversation Context:
    """
    
    # Add previous conversation context
    context_history = "\n".join([f"User: {exchange['user']}\nAssistant: {exchange['assistant']}" for exchange in st.session_state.conversation_context])
    
    return base_context + context_history

# Function to convert text to speech using edge-tts
async def text_to_speech(text):
    try:
        # Create a temporary file to store the audio
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_audio:
            temp_audio_path = temp_audio.name
            # Initialize edge-tts with a male voice
            communicate = edge_tts.Communicate(text, 'en-US-ChristopherNeural')
            
            # Generate audio and save to temporary file
            await communicate.save(temp_audio_path)
        
        # Wait for the file to close and finalize before accessing it
        with open(temp_audio_path, 'rb') as audio_file:
            audio_bytes = audio_file.read()
        
        # Clean up the temporary file
        os.unlink(temp_audio_path)
        
        return audio_bytes
            
    except Exception as e:
        st.error(f"Error generating speech: {str(e)}")
        return None

# Helper function to run async text_to_speech
def generate_speech(text):
    return asyncio.run(text_to_speech(text))

# Function to display the chat history
def display_chat():
    for idx, message in enumerate(st.session_state.messages):
        with st.chat_message(message["role"]):
            st.write(message["content"])
            
            # Only show play button for assistant messages
            if message["role"] == "assistant":
                # Generate a unique key for each play button
                if st.button("🔊 Play", key=f"play_button_{idx}"):
                    audio_data = generate_speech(message["content"])
                    if audio_data:
                        # Use st.audio with the audio data and proper format
                        st.audio(audio_data, format="audio/mp3")

# Function to process the uploaded audio file and convert it to text
def process_audio_file(uploaded_audio):
    try:
        # Use temporary file to save the uploaded audio
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_audio:
            temp_audio_path = temp_audio.name
            temp_audio.write(uploaded_audio.read())
        
        # Use SpeechRecognition to convert the audio to text
        recognizer = sr.Recognizer()
        with sr.AudioFile(temp_audio_path) as source:
            audio = recognizer.record(source)
        
        # Recognize speech using Google Speech Recognition API
        speech_text = recognizer.recognize_google(audio)
        os.remove(temp_audio_path)  # Clean up the temporary file
        return speech_text
    except Exception as e:
        return f"Sorry, an error occurred: {str(e)}"

# Function to perform speech-to-text from the microphone
def speech_to_text():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    
    with microphone as source:
        st.write("Listening... Speak now.")
        audio = recognizer.listen(source)
    
    try:
        speech_text = recognizer.recognize_google(audio)
        return speech_text
    except sr.UnknownValueError:
        return "Sorry, I could not understand your speech."
    except sr.RequestError:
        return "Sorry, the speech service is unavailable."

# Main interface
st.sidebar.header("🎧 Upload Audio File")
uploaded_audio = st.sidebar.file_uploader("Choose an audio file", type=['mp3', 'wav', 'aiff', 'flac'])

# Handle audio file upload
if uploaded_audio:
    speech_text = process_audio_file(uploaded_audio)
    if speech_text and not speech_text.startswith("Sorry") and not speech_text.startswith("Error"):
        st.session_state.messages.append({"role": "user", "content": speech_text})
        
        with st.spinner("Processing..."):
            chat_completion = client.chat.completions.create(
                messages=[{"role": "system", "content": prepare_system_context()},
                          {"role": "user", "content": speech_text}],
                model="llama3-8b-8192",
                stream=False,
            )
            
            assistant_reply = chat_completion.choices[0].message.content
            st.session_state.messages.append({"role": "assistant", "content": assistant_reply})
            
            # Update conversation context
            update_conversation_context(speech_text, assistant_reply)

# Text input and speech button
user_input = st.chat_input("Type your message...")
speak_button = st.button("🎤 Speak")

if speak_button:
    speech_text = speech_to_text()
    if not speech_text.startswith(("Sorry", "No speech", "Speech recognition")):
        st.session_state.messages.append({"role": "user", "content": speech_text})
        
        with st.spinner("Processing..."):
            chat_completion = client.chat.completions.create(
                messages=[{"role": "system", "content": prepare_system_context()},
                          {"role": "user", "content": speech_text}],
                model="llama3-8b-8192",
                stream=False,
            )
            
            assistant_reply = chat_completion.choices[0].message.content
            st.session_state.messages.append({"role": "assistant", "content": assistant_reply})
            
            # Update conversation context
            update_conversation_context(speech_text, assistant_reply)

if user_input:
    st.session_state.messages.append({"role": "user", "content": user_input})
    
    with st.spinner("Processing..."):
        chat_completion = client.chat.completions.create(
            messages=[{"role": "system", "content": prepare_system_context()},
                      {"role": "user", "content": user_input}],
            model="llama3-8b-8192",
            stream=False,
        )
        
        assistant_reply = chat_completion.choices[0].message.content
        st.session_state.messages.append({"role": "assistant", "content": assistant_reply})
        
        # Update conversation context
        update_conversation_context(user_input, assistant_reply)

# Display chat history
display_chat()

# Clear chat history button
if st.sidebar.button("Clear Chat History"):
    st.session_state.messages = [{"role": "assistant", "content": "Welcome to HomeFix Buddy! I'm here to help you with all your home maintenance needs. What home repair or maintenance question can I assist you with today?"}]
    st.session_state.conversation_context = []