from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import stripe
from dotenv import load_dotenv

load_dotenv()  # loads backend/.env

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app = FastAPI()

# Allow local frontend origin (adjust if different)
# build origins list from env (allow comma-separated values), default to localhost:3000
_origins = os.getenv("NEXT_PUBLIC_BASE_URL", "http://localhost:3000")
origins = [o.strip() for o in _origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # must include http://localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CheckoutBody(BaseModel):
    priceId: str | None = None

@app.post("/api/checkout")
async def create_checkout(body: CheckoutBody, request: Request):
    price_id = body.priceId or os.getenv("STRIPE_PRICE_ID")
    if not price_id:
        raise HTTPException(status_code=400, detail="Missing priceId")

    origin = request.headers.get("origin") or os.getenv("NEXT_PUBLIC_BASE_URL", "http://localhost:3000")

    try:
        session = stripe.checkout.Session.create(
            mode="subscription",               # or "payment" for one-time
            payment_method_types=["card"],
            line_items=[{"price": price_id, "quantity": 1}],
            allow_promotion_codes=True,
            success_url=f"{origin}/pricing?session_id={{CHECKOUT_SESSION_ID}}&success=true",
            cancel_url=f"{origin}/pricing?canceled=true",
        )
        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))