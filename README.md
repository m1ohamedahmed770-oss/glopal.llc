# Global U - Digital Volunteer Work Agreement

This is a React application for generating and signing the Global LLC Digital Volunteer Work Agreement.

## Features

*   **Digital Form:** Allows volunteers to input their name and email.
*   **Auto-Signature:** Generates a stylized digital signature based on the input name.
*   **PDF Generation:** Converts the agreement into a high-quality PDF using `html2canvas` and `jspdf`.
*   **LinkedIn Integration:** Direct link to contact the team.

## Project Structure

This project is built with:
*   [Vite](https://vitejs.dev/) - Frontend Tooling
*   [React](https://react.dev/) - UI Library
*   [Tailwind CSS](https://tailwindcss.com/) - Styling (Loaded via CDN for simplicity)
*   [html2canvas](https://html2canvas.hertzen.com/) & [jsPDF](https://parall.ax/products/jspdf) - PDF Generation

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## Note on PDF Libraries

This project intentionally loads `html2canvas` and `jspdf` via CDN in `index.html` to avoid specific ESM bundling issues with these libraries in certain environments. The code in `App.tsx` references them via `window.html2canvas` and `window.jspdf`.
