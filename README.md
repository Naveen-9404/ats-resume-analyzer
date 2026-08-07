# VectorCV 🚀

An AI-powered ATS (Applicant Tracking System) Resume Analyzer built using the MERN stack. This application helps users analyze resumes against job descriptions, calculate ATS compatibility scores, identify missing skills, and receive AI-powered resume improvement suggestions.

---

# ✨ Features

## 🔐 Authentication System

* User Registration
* User Login
* JWT Authentication
* Protected Dashboard Routes
* Logout Functionality

## 📄 Resume Analysis

* Upload Resume PDF
* Extract Resume Text
* Compare Resume with Job Description
* ATS Compatibility Score
* Matched Skills Detection
* Missing Skills Identification
* Resume Analysis History

## 🤖 AI Features

* AI Resume Suggestions
* Resume Improvement Tips
* Keyword Recommendations
* ATS Optimization Insights

## 📊 Dashboard Features

* Professional SaaS-style UI
* Sidebar Navigation
* Circular ATS Score Meter
* Resume Analysis History Cards
* PDF Report Download
* Responsive Design

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React Icons
* React Circular Progressbar
* jsPDF

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer
* PDF Parse

## AI Integration

* Google Gemini API

---

# 📂 Project Structure

```bash
ATS_Resume_Analyzer
│
├── client
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ats-resume-analyzer.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# ▶️ Running the Application

## Start Backend

```bash
cd server
npm run dev
```

## Start Frontend

```bash
cd client
npm run dev
```

---

# 📌 Application Workflow

1. User registers and logs in.
2. User uploads resume PDF.
3. User pastes job description.
4. Resume text is extracted.
5. ATS score is calculated.
6. Skills are matched with job description.
7. Missing skills are identified.
8. AI suggestions are generated.
9. Analysis history is stored in MongoDB.
10. User can download ATS report PDF.

---

# 📸 Screenshots

## Dashboard

*Add dashboard screenshot here.*

## Resume Analysis

*Add ATS analysis screenshot here.*

## Login Page

*Add login page screenshot here.*

---

# 🚀 Future Enhancements

* Dark Mode
* Resume Rewriting using AI
* Drag & Drop Upload
* Advanced NLP Skill Extraction
* Multi-Resume Comparison
* Live Deployment
* Admin Dashboard
* AI Cover Letter Generator

---

# 📚 Learning Outcomes

This project helped in learning:

* MERN Stack Development
* Authentication using JWT
* MongoDB Integration
* REST API Development
* AI API Integration
* File Upload Handling
* Professional UI Development
* State Management in React
* PDF Generation
* Deployment Workflow

---

# 🤝 Contributing

Contributions are welcome.
Feel free to fork this repository and submit pull requests.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Naveen Derangula**

* GitHub: [https://github.com/Naveen-9404](https://github.com/Naveen-9404)
* LinkedIn: Add your LinkedIn profile here

---

# ⭐ Support

If you found this project helpful, consider giving it a star on GitHub ⭐
