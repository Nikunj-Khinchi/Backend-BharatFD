# FAQ Management API

A backend API built with **Node.js, Express, and MongoDB** to manage FAQs with **multi-language support**, **automatic translations**, **rate limiting**, and **caching** using **Redis**.

---

## Features

- **Create, Read, Update, and Delete (CRUD) FAQs**
- **Auto-translate answers** using `google-translate-api-x`
- **Multi-language support** (`?lang=es` for translations)
- **Rate limiting** to prevent abuse (`express-rate-limit`)
- **Caching with Redis** for fast responses
- **Input validation** with `express-validator`
- **Unit testing** with `Jest` & `Supertest`
- **Docker support** for easy deployment

---

## Tech Stack

- **Node.js** - Backend runtime
- **Express.js** - API framework
- **MongoDB** - NoSQL database
- **Redis** - Caching mechanism
- **Jest & Supertest** - Testing
- **Docker** - Deployment support

---

## Installation & Setup

### **Clone the Repository**

```sh
git clone https://github.com/your-repo/faq-api.git
cd faq-api
```

### **Install Dependencies**

```sh
npm install
```

### **Set Environment Variables**

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/faq
REDIS_HOST=localhost
REDIS_PORT=6379
```

### **Start the Server**

```sh
npm start
```

---

## API Endpoints

##### **Create a FAQ**

```http
POST /api/faqs
```

```json
Request Body:
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
}

Response:
{
  "success": true,
  "data": {
    "_id": "60f3b3b3b3b3b3b3b3b3b3b3",
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
  }
}
```

##### **Get All FAQs**

```http
GET /api/faqs
```

```json
Response:
{
  "success": true,
  "data": [
    {
      "_id": "60f3b3b3b3b3b3b3b3b3b3",
      "question": "What is Node.js?",
      "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
    }
  ]
}

```

##### **Get a FAQ by Language**

```http
GET /api/faqs?lang=hi
```

```json
Response:
{
  "success": true,
  "data": {
    "_id": "60f3b3b3b3b3b3b3b3b3b3",
    "question": "What is Node.js?",
    "answer": "नोड.जेएस एक जावास्क्रिप्ट रनटाइम है जो क्रोम के वी8 जावास्क्रिप्ट इंजन पर बना है।"
  }
}

```

##### **Update a FAQ**

```http
PUT /api/faqs/:id
```

```json
Request Body:
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
}

Response:
{
  "success": true,
  "data": {
    "_id": "60f3b3b3b3b3b3b3b3b3b3",
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
  }
}
```

##### **Delete a FAQ**

```http
DELETE /api/faqs/:id
```

```json
Response:
{
  "success": true,
  "message": "FAQ deleted successfully"
}
```

### Run Tests

```sh
npm test
```

---

## Docker Support

##### **Build Docker Image**

```sh
docker build -t faq-api .
```

##### **Run Docker Container**

Use the provided `docker-compose.yml` file to run the application with Docker Compose.

**Run the Docker Compose**

```sh
docker-compose up --build
```

---
## Deployment

The application is deployed on Render. You can access the health check endpoint at the following link:

[Health Check Endpoint](https://backend-bharatfd.onrender.com/api/healthcheck)

