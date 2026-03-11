# Full-Stack Authentication & RBAC System

A secure full-stack web application featuring JWT-based authentication and Role-Based Access Control (RBAC).

## 🚀 Features
- **Registration & Login**: Secure user onboarding with role assignment.
- **Role-Based Access Control (RBAC)**: Distinct access levels for `USER` and `ADMIN`.
- **JWT Authentication**: Stateless session management with secure token exchange.
- **Bonus Features**: 
  - Robust password validation (Regex-based).
  - Loading spinners and skeleton states.
  - Full responsive UI (Mobile/Desktop).
  - Secure Logout functionality.

## 🛠 Tech Stack
### Backend
- **Java 17+** (Running on Java 25)
- **Spring Boot 3**
- **Spring Security & JWT**
- **Spring Data JPA & Hibernate**
- **H2 In-Memory Database**
- **MapStruct & Maven**
- **Swagger/OpenAPI**

### Frontend
- **React 19 + TypeScript**
- **Vite**
- **React Router 7**
- **TanStack Query (React Query)**
- **Axios**
- **React Hook Form**
- **Tailwind CSS v4**

---

## 🚦 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **Java JDK** (17 or higher)
- **Maven** (optional, wrapper included)

### 2. Backend Setup
1. Navigate to the `BackEnd` directory:
   ```bash
   cd BackEnd
   ```
2. Start the application using the Maven Wrapper:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
3. The server will start at `http://localhost:8080`.
4. **Swagger UI**: Visit `http://localhost:8080/swagger-ui/index.html` to test APIs.
5. **H2 Console**: Visit ` ` (JDBC URL: `jdbc:h2:mem:authdb`).

### 3. Frontend Setup
1. Open a new terminal and navigate to the `FrontEnd` directory:
   ```bash
   cd FrontEnd
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.

---

## 🔐 Access Rules
| Endpoint | Access Level |
| :--- | :--- |
| `/api/public/**` | Everyone (Public) |
| `/api/user/**` | USER, ADMIN |
| `/api/admin/**` | ADMIN Only |

---

## 📝 Credentials for Testing
- You can register any account via the UI.
- Select the **ADMIN** role during registration to access the Admin Content card in the Dashboard.
- Passwords must be at least **8 characters** and include: Uppercase, Lowercase, Number, and Special Character.
