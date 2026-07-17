# PROMPTS.md

# Homestay Review Analyzer - AI Prompt Log

## Prompt Version 1

### Prompt

```
Analyze the following guest review.

Return:
Sentiment
Theme
AI Response

Guest Review:
"The room was very clean, staff was friendly but WiFi was slow."
```

### Example Output

Sentiment:
Positive

Theme:
Cleanliness, Staff, WiFi

AI Response:
Thank you for your valuable feedback. We are glad that you enjoyed the cleanliness of the room and appreciated our staff. We apologize for the slow WiFi and will work to improve it.

---

## Prompt Version 2

### Prompt

```
You are an AI assistant for a Homestay Review Analyzer.

Analyze the following guest review.

Return ONLY in this format:

Sentiment:
Theme:
AI Response:

Guest Review:
"The room was very clean, staff was friendly but WiFi was slow."
```

### Example Output

Sentiment:
Positive

Theme:
Cleanliness, Friendly Staff

AI Response:
Thank you for sharing your experience. We're delighted that you enjoyed the clean room and friendly hospitality. We regret the inconvenience caused by the WiFi and will work to improve our internet service.

---

## Prompt Version 3 (Best Prompt)

### Prompt

```
You are an AI assistant for a Homestay Review Analyzer.

Your task is to analyze guest reviews.

Return ONLY:

Sentiment:
Theme:
AI Response:

The AI Response should be polite, professional, and suitable for replying to a hotel guest.

Guest Review:
"The room was very clean, staff was friendly but WiFi was slow."
```

### Example Output

Sentiment:
Positive

Theme:
Cleanliness, Customer Service

AI Response:
Thank you for taking the time to share your feedback. We are pleased that you enjoyed our clean rooms and friendly staff. We sincerely apologize for the slow WiFi and appreciate your suggestion. We hope to welcome you again for an even better experience.

---

# Best Prompt

Prompt Version 3 produced the best results because it generated consistent sentiment classification, identified meaningful themes, and produced a professional hotel response suitable for real customer communication. It also followed the required output format, making it easier for the backend to parse and store the AI-generated data automatically.

---

# System Role

You are an AI assistant for a Homestay Review Analyzer that analyzes guest reviews and generates professional hotel responses.