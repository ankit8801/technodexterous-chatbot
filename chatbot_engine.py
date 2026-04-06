import re
from intents import INTENTS
from responses import RESPONSES, FALLBACK_RESPONSE, FALLBACK_BUTTONS

def get_bot_response(user_input: str) -> dict:
    """
    Analyzes the user input and returns an appropriate response dictionary.
    Returns format: {"text": str, "buttons": list}
    """
    user_input = user_input.lower().strip()
    
    if not user_input:
        return {"text": "Please type a message so I can help you!", "buttons": []}
        
    # 1. Safety check for restricted actions
    for pattern in INTENTS["restricted"]:
        if re.search(r'\b' + re.escape(pattern) + r'\b', user_input):
            return {"text": RESPONSES["restricted"][0], "buttons": []}
            
    # 2. Identify the intent
    matched_intent = None
    for intent_name, patterns in INTENTS.items():
        if intent_name == "restricted":
            continue
        for pattern in patterns:
            # We use word boundaries to avoid partial matches
            if re.search(r'\b' + re.escape(pattern) + r'\b', user_input):
                matched_intent = intent_name
                break
        if matched_intent:
            break
            
    # 3. Handle identified intent
    if matched_intent:
        text = RESPONSES[matched_intent][0]
        # Provide suggested interactions if the user just greets the bot
        buttons = []
        if matched_intent == "greeting":
            buttons = FALLBACK_BUTTONS
        return {"text": text, "buttons": buttons}
        
    # 4. Fallback system with suggested buttons
    return {"text": FALLBACK_RESPONSE, "buttons": FALLBACK_BUTTONS}
