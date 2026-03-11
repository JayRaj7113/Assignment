# Full-Stack Auth & RBAC Project

This is a full-stack web application I built for my assignment. It implements JWT-based authentication and Role-Based Access Control (RBAC) using Spring Boot and React.

## Features I Implemented
- **User Registration & Login**: Users can sign up and choose between USER and ADMIN roles.
- **Role-Based Access**: The app restricts access to certain pages and APIs based on the user's role.
- **JWT Security**: I used JSON Web Tokens for secure, stateless authentication.
- **Password Validation**: Added regex rules to make sure passwords are secure (must include uppercase, lowercase, numbers, and symbols).
- **Responsive Design**: The UI works well on both mobile and desktop screens.
- **UI Details**: Added loading spinners and skeleton loaders to improve the user experience.

## Technologies Used
### Backend (Spring Boot)
- Java 17+
- Spring Security + JWT
- Spring Data JPA (H2 In-memory DB)
- Maven
- Swagger for API documentation

### Frontend (React)
- React 19 with TypeScript
- Vite
- Tailwind CSS
- React Router & React Query
- Axios for API calls
- React Hook Form for validation

---

## How to Run the Project

### Prerequisite
Make sure you have Node.js and Java JDK installed on your machine.

### Running the Backend
1. Open a terminal and go into the `BackEnd` folder.
2. Run the following command:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
3. The backend will start on port 8080.
4. You can check the API documentation at: `http://localhost:8080/swagger-ui/index.html`.
5. If you want to see the database, go to the H2 console at `http://localhost:8080/h2-console` (use `jdbc:h2:mem:authdb` as the JDBC URL).

### Running the Frontend
1. Open a new terminal and go into the `FrontEnd` folder.
2. If you haven't yet, install the dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. The app will be available at `http://localhost:5173`.

---

## API Access Rules
| Path | Who can access? |
| :--- | :--- |
| `/api/public/**` | Everyone |
| `/api/user/**` | Both Users and Admins |
| `/api/admin/**` | Admins Only |

## Testing the App
- You can register a new account and pick a role.
- If you pick **ADMIN**, you'll see an extra card on the dashboard that normal users can't see.
- Password requirements: At least 8 characters, must have uppercase, lowercase, a number, and a special character.
